package ui

import (
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"testing"
	"time"

	"github.com/CristianoSword/web-fullstack-study/2-backend/13-go/03-rate-limiter-middleware/internal/domain"
	"github.com/CristianoSword/web-fullstack-study/2-backend/13-go/03-rate-limiter-middleware/internal/service"
)

func TestServerRateLimiting(t *testing.T) {
	limiter, err := service.NewLimiter(domain.RateLimitConfig{
		Capacity:        2,
		RefillTokens:    1,
		RefillInterval:  time.Minute,
		Burst:           2,
		CleanupInterval: time.Minute,
		EntryTTL:        5 * time.Minute,
	})
	if err != nil {
		t.Fatalf("expected limiter setup, got %v", err)
	}

	server := NewServer(limiter)

	first := httptest.NewRecorder()
	firstRequest := httptest.NewRequest(http.MethodGet, "/api/ping", nil)
	firstRequest.RemoteAddr = "203.0.113.10:8080"
	server.ServeHTTP(first, firstRequest)
	if first.Code != http.StatusOK {
		t.Fatalf("expected first status 200, got %d", first.Code)
	}

	second := httptest.NewRecorder()
	secondRequest := httptest.NewRequest(http.MethodGet, "/api/ping", nil)
	secondRequest.RemoteAddr = "203.0.113.10:8080"
	server.ServeHTTP(second, secondRequest)
	if second.Code != http.StatusOK {
		t.Fatalf("expected second status 200, got %d", second.Code)
	}

	third := httptest.NewRecorder()
	thirdRequest := httptest.NewRequest(http.MethodGet, "/api/ping", nil)
	thirdRequest.RemoteAddr = "203.0.113.10:8080"
	server.ServeHTTP(third, thirdRequest)
	if third.Code != http.StatusTooManyRequests {
		t.Fatalf("expected third status 429, got %d", third.Code)
	}
	if third.Header().Get("Retry-After") == "" {
		t.Fatalf("expected retry-after header to be set")
	}

	var payload domain.RateLimitDecision
	if err := json.Unmarshal(third.Body.Bytes(), &payload); err != nil {
		t.Fatalf("unmarshal 429 response: %v", err)
	}
	if payload.Allowed {
		t.Fatalf("expected blocked payload")
	}
}

func TestServerMetricsAndProxyIP(t *testing.T) {
	limiter, err := service.NewLimiter(domain.RateLimitConfig{
		Capacity:        1,
		RefillTokens:    1,
		RefillInterval:  time.Minute,
		Burst:           1,
		CleanupInterval: time.Minute,
		EntryTTL:        5 * time.Minute,
	})
	if err != nil {
		t.Fatalf("expected limiter setup, got %v", err)
	}

	server := NewServer(limiter)

	request := httptest.NewRequest(http.MethodGet, "/metrics", nil)
	request.Header.Set("X-Forwarded-For", "198.51.100.20, 10.0.0.1")
	response := httptest.NewRecorder()
	server.ServeHTTP(response, request)

	if response.Code != http.StatusOK {
		t.Fatalf("expected metrics status 200, got %d", response.Code)
	}
}
