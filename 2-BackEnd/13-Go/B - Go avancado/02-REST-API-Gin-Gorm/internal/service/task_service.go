package service

import (
	"fmt"
	"strings"

	"github.com/CristianoSword/web-fullstack-study/2-backend/13-go/02-rest-api-gin-gorm/internal/domain"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

var (
	allowedStatus   = map[string]struct{}{"todo": {}, "in_progress": {}, "done": {}}
	allowedPriority = map[string]struct{}{"low": {}, "medium": {}, "high": {}}
)

type TaskService struct {
	db *gorm.DB
}

func NewTaskService(dsn string) (*TaskService, error) {
	if strings.TrimSpace(dsn) == "" {
		return nil, fmt.Errorf("database dsn is required")
	}
	db, err := gorm.Open(sqlite.Open(dsn), &gorm.Config{})
	if err != nil {
		return nil, fmt.Errorf("open database: %w", err)
	}
	if err := db.AutoMigrate(&domain.Task{}); err != nil {
		return nil, fmt.Errorf("auto migrate tasks: %w", err)
	}
	return &TaskService{db: db}, nil
}

func (s *TaskService) List(query domain.TaskQuery) ([]domain.Task, error) {
	var tasks []domain.Task
	tx := s.db.Model(&domain.Task{})
	if query.Status != "" {
		tx = tx.Where("status = ?", query.Status)
	}
	if query.Priority != "" {
		tx = tx.Where("priority = ?", query.Priority)
	}
	if query.Owner != "" {
		tx = tx.Where("owner = ?", query.Owner)
	}
	if err := tx.Order("created_at desc").Find(&tasks).Error; err != nil {
		return nil, fmt.Errorf("list tasks: %w", err)
	}
	return tasks, nil
}

func (s *TaskService) Find(id uint) (domain.Task, error) {
	var task domain.Task
	if err := s.db.First(&task, id).Error; err != nil {
		if err == gorm.ErrRecordNotFound {
			return domain.Task{}, fmt.Errorf("task not found")
		}
		return domain.Task{}, fmt.Errorf("find task: %w", err)
	}
	return task, nil
}

func (s *TaskService) Create(request domain.CreateTaskRequest) (domain.Task, error) {
	normalized, err := normalizeCreateRequest(request)
	if err != nil {
		return domain.Task{}, err
	}
	task := domain.Task{
		Title:       normalized.Title,
		Description: normalized.Description,
		Status:      normalized.Status,
		Priority:    normalized.Priority,
		Owner:       normalized.Owner,
	}
	if err := s.db.Create(&task).Error; err != nil {
		return domain.Task{}, fmt.Errorf("create task: %w", err)
	}
	return task, nil
}

func (s *TaskService) Update(id uint, request domain.UpdateTaskRequest) (domain.Task, error) {
	task, err := s.Find(id)
	if err != nil {
		return domain.Task{}, err
	}
	if err := applyUpdate(&task, request); err != nil {
		return domain.Task{}, err
	}
	if err := s.db.Save(&task).Error; err != nil {
		return domain.Task{}, fmt.Errorf("update task: %w", err)
	}
	return task, nil
}

func (s *TaskService) Delete(id uint) error {
	task, err := s.Find(id)
	if err != nil {
		return err
	}
	if err := s.db.Delete(&task).Error; err != nil {
		return fmt.Errorf("delete task: %w", err)
	}
	return nil
}

func normalizeCreateRequest(request domain.CreateTaskRequest) (domain.CreateTaskRequest, error) {
	request.Title = strings.TrimSpace(request.Title)
	request.Description = strings.TrimSpace(request.Description)
	request.Status = normalizeStatus(request.Status)
	request.Priority = normalizePriority(request.Priority)
	request.Owner = strings.TrimSpace(request.Owner)

	if request.Title == "" {
		return domain.CreateTaskRequest{}, fmt.Errorf("title is required")
	}
	if request.Description == "" {
		return domain.CreateTaskRequest{}, fmt.Errorf("description is required")
	}
	if _, ok := allowedStatus[request.Status]; !ok {
		return domain.CreateTaskRequest{}, fmt.Errorf("status must be one of: todo, in_progress, done")
	}
	if _, ok := allowedPriority[request.Priority]; !ok {
		return domain.CreateTaskRequest{}, fmt.Errorf("priority must be one of: low, medium, high")
	}
	if request.Owner == "" {
		return domain.CreateTaskRequest{}, fmt.Errorf("owner is required")
	}
	return request, nil
}

func applyUpdate(task *domain.Task, request domain.UpdateTaskRequest) error {
	if request.Title != nil {
		value := strings.TrimSpace(*request.Title)
		if value == "" {
			return fmt.Errorf("title cannot be empty")
		}
		task.Title = value
	}
	if request.Description != nil {
		value := strings.TrimSpace(*request.Description)
		if value == "" {
			return fmt.Errorf("description cannot be empty")
		}
		task.Description = value
	}
	if request.Status != nil {
		value := normalizeStatus(*request.Status)
		if _, ok := allowedStatus[value]; !ok {
			return fmt.Errorf("status must be one of: todo, in_progress, done")
		}
		task.Status = value
	}
	if request.Priority != nil {
		value := normalizePriority(*request.Priority)
		if _, ok := allowedPriority[value]; !ok {
			return fmt.Errorf("priority must be one of: low, medium, high")
		}
		task.Priority = value
	}
	if request.Owner != nil {
		value := strings.TrimSpace(*request.Owner)
		if value == "" {
			return fmt.Errorf("owner cannot be empty")
		}
		task.Owner = value
	}
	return nil
}

func normalizeStatus(value string) string {
	return strings.ToLower(strings.TrimSpace(value))
}

func normalizePriority(value string) string {
	return strings.ToLower(strings.TrimSpace(value))
}
