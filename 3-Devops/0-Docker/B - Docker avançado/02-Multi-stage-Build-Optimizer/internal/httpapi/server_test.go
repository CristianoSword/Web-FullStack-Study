package httpapi

import (
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"strings"
	"testing"

	"study/docker/multistageoptimizer/internal/config"
)

func TestHealthRouteReturnsStatus(t *testing.T) {
	server := NewServer(config.Settings{
		AppName: "test-app",
		Host:    "0.0.0.0",
		Port:    "3050",
	})

	request := httptest.NewRequest(http.MethodGet, "/health", nil)
	recorder := httptest.NewRecorder()

	server.Router().ServeHTTP(recorder, request)

	if recorder.Code != http.StatusOK {
		t.Fatalf("expected status 200, got %d", recorder.Code)
	}

	var payload map[string]any
	if err := json.Unmarshal(recorder.Body.Bytes(), &payload); err != nil {
		t.Fatalf("could not decode health payload: %v", err)
	}

	if payload["runtimeImage"] != "scratch" {
		t.Fatalf("expected runtime image scratch, got %v", payload["runtimeImage"])
	}
}

func TestArtifactsRouteExposesStages(t *testing.T) {
	server := NewServer(config.Load())

	request := httptest.NewRequest(http.MethodGet, "/artifacts", nil)
	recorder := httptest.NewRecorder()

	server.Router().ServeHTTP(recorder, request)

	if recorder.Code != http.StatusOK {
		t.Fatalf("expected status 200, got %d", recorder.Code)
	}

	if !strings.Contains(recorder.Body.String(), "\"runtime\"") {
		t.Fatalf("expected artifact payload to include runtime stage, got %s", recorder.Body.String())
	}
}
