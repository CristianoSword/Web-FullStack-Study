package ui

import (
	"bytes"
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/CristianoSword/web-fullstack-study/2-backend/13-go/05-go-http-server-basic/internal/domain"
	"github.com/CristianoSword/web-fullstack-study/2-backend/13-go/05-go-http-server-basic/internal/service"
)

func TestHTTPHandlerRoutes(t *testing.T) {
	catalog, err := service.NewCatalogService([]domain.Book{
		{
			Title:       "Go APIs",
			Author:      "Cristiano",
			Category:    "backend",
			Description: "Intro to JSON APIs.",
		},
	})
	if err != nil {
		t.Fatalf("expected catalog setup, got %v", err)
	}

	handler := NewHTTPHandler(catalog)

	t.Run("health", func(t *testing.T) {
		recorder := httptest.NewRecorder()
		request := httptest.NewRequest(http.MethodGet, "/health", nil)
		handler.ServeHTTP(recorder, request)

		if recorder.Code != http.StatusOK {
			t.Fatalf("expected 200, got %d", recorder.Code)
		}
	})

	t.Run("list and create", func(t *testing.T) {
		listRecorder := httptest.NewRecorder()
		listRequest := httptest.NewRequest(http.MethodGet, "/books", nil)
		handler.ServeHTTP(listRecorder, listRequest)
		if listRecorder.Code != http.StatusOK {
			t.Fatalf("expected list status 200, got %d", listRecorder.Code)
		}

		payload, _ := json.Marshal(domain.CreateBookRequest{
			Title:       "Go Routing",
			Author:      "Study Team",
			Category:    "api",
			Description: "net/http route composition.",
		})
		createRecorder := httptest.NewRecorder()
		createRequest := httptest.NewRequest(http.MethodPost, "/books", bytes.NewReader(payload))
		handler.ServeHTTP(createRecorder, createRequest)
		if createRecorder.Code != http.StatusCreated {
			t.Fatalf("expected create status 201, got %d", createRecorder.Code)
		}
	})

	t.Run("get missing", func(t *testing.T) {
		recorder := httptest.NewRecorder()
		request := httptest.NewRequest(http.MethodGet, "/books/book-999", nil)
		handler.ServeHTTP(recorder, request)

		if recorder.Code != http.StatusNotFound {
			t.Fatalf("expected 404, got %d", recorder.Code)
		}
	})
}
