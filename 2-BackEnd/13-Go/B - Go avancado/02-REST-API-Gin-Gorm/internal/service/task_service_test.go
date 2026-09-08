package service

import (
	"path/filepath"
	"testing"

	"github.com/CristianoSword/web-fullstack-study/2-backend/13-go/02-rest-api-gin-gorm/internal/domain"
)

func TestTaskServiceCRUD(t *testing.T) {
	service := newTestService(t)
	defer func() {
		if err := service.Close(); err != nil {
			t.Fatalf("close service: %v", err)
		}
	}()

	created, err := service.Create(domain.CreateTaskRequest{
		Title:       "Build API",
		Description: "Create endpoints with Gin and persist using GORM.",
		Status:      "todo",
		Priority:    "high",
		Owner:       "Cristiano",
	})
	if err != nil {
		t.Fatalf("expected create to succeed, got %v", err)
	}

	found, err := service.Find(created.ID)
	if err != nil || found.Title != created.Title {
		t.Fatalf("expected created task to be found, got %#v err=%v", found, err)
	}

	status := "done"
	updated, err := service.Update(created.ID, domain.UpdateTaskRequest{Status: &status})
	if err != nil {
		t.Fatalf("expected update to succeed, got %v", err)
	}
	if updated.Status != "done" {
		t.Fatalf("expected updated status done, got %s", updated.Status)
	}

	tasks, err := service.List(domain.TaskQuery{Status: "done"})
	if err != nil {
		t.Fatalf("expected list to succeed, got %v", err)
	}
	if len(tasks) != 1 {
		t.Fatalf("expected one filtered task, got %d", len(tasks))
	}

	if err := service.Delete(created.ID); err != nil {
		t.Fatalf("expected delete to succeed, got %v", err)
	}
	if _, err := service.Find(created.ID); err == nil {
		t.Fatalf("expected deleted task to be missing")
	}
}

func TestTaskServiceValidation(t *testing.T) {
	service := newTestService(t)
	defer func() {
		if err := service.Close(); err != nil {
			t.Fatalf("close service: %v", err)
		}
	}()

	if _, err := service.Create(domain.CreateTaskRequest{}); err == nil {
		t.Fatalf("expected empty create request to fail")
	}
	if _, err := NewTaskService(""); err == nil {
		t.Fatalf("expected missing dsn to fail")
	}
}

func newTestService(t *testing.T) *TaskService {
	t.Helper()

	databasePath := filepath.Join(t.TempDir(), "tasks.db")
	service, err := NewTaskService(databasePath)
	if err != nil {
		t.Fatalf("expected task service setup, got %v", err)
	}
	return service
}
