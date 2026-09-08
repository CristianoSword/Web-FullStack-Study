package ui

import (
	"bytes"
	"encoding/json"
	"fmt"
	"net/http"
	"net/http/httptest"
	"path/filepath"
	"testing"

	"github.com/CristianoSword/web-fullstack-study/2-backend/13-go/02-rest-api-gin-gorm/internal/domain"
	"github.com/CristianoSword/web-fullstack-study/2-backend/13-go/02-rest-api-gin-gorm/internal/service"
)

func TestRouterCRUDFlow(t *testing.T) {
	databasePath := filepath.Join(t.TempDir(), "tasks.db")
	taskService, err := service.NewTaskService(databasePath)
	if err != nil {
		t.Fatalf("expected task service setup, got %v", err)
	}
	defer func() {
		if err := taskService.Close(); err != nil {
			t.Fatalf("close service: %v", err)
		}
	}()
	router := NewRouter(taskService)

	payload, _ := json.Marshal(domain.CreateTaskRequest{
		Title:       "Ship Go API",
		Description: "Wire Gin handlers to GORM service.",
		Status:      "todo",
		Priority:    "medium",
		Owner:       "Cristiano",
	})

	createRecorder := httptest.NewRecorder()
	createRequest := httptest.NewRequest(http.MethodPost, "/tasks", bytes.NewReader(payload))
	createRequest.Header.Set("Content-Type", "application/json")
	router.ServeHTTP(createRecorder, createRequest)
	if createRecorder.Code != http.StatusCreated {
		t.Fatalf("expected create status 201, got %d", createRecorder.Code)
	}

	var created domain.Task
	if err := json.Unmarshal(createRecorder.Body.Bytes(), &created); err != nil {
		t.Fatalf("unmarshal created task: %v", err)
	}

	listRecorder := httptest.NewRecorder()
	listRequest := httptest.NewRequest(http.MethodGet, "/tasks?status=todo", nil)
	router.ServeHTTP(listRecorder, listRequest)
	if listRecorder.Code != http.StatusOK {
		t.Fatalf("expected list status 200, got %d", listRecorder.Code)
	}

	status := "in_progress"
	updatePayload, _ := json.Marshal(domain.UpdateTaskRequest{Status: &status})
	updateRecorder := httptest.NewRecorder()
	updateRequest := httptest.NewRequest(http.MethodPatch, "/tasks/"+jsonID(created.ID), bytes.NewReader(updatePayload))
	updateRequest.Header.Set("Content-Type", "application/json")
	router.ServeHTTP(updateRecorder, updateRequest)
	if updateRecorder.Code != http.StatusOK {
		t.Fatalf("expected update status 200, got %d", updateRecorder.Code)
	}

	getRecorder := httptest.NewRecorder()
	getRequest := httptest.NewRequest(http.MethodGet, "/tasks/"+jsonID(created.ID), nil)
	router.ServeHTTP(getRecorder, getRequest)
	if getRecorder.Code != http.StatusOK {
		t.Fatalf("expected get status 200, got %d", getRecorder.Code)
	}

	deleteRecorder := httptest.NewRecorder()
	deleteRequest := httptest.NewRequest(http.MethodDelete, "/tasks/"+jsonID(created.ID), nil)
	router.ServeHTTP(deleteRecorder, deleteRequest)
	if deleteRecorder.Code != http.StatusNoContent {
		t.Fatalf("expected delete status 204, got %d", deleteRecorder.Code)
	}
}

func jsonID(id uint) string {
	return fmt.Sprintf("%d", id)
}
