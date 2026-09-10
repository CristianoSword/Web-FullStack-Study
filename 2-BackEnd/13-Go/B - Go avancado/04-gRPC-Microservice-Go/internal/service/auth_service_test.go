package service

import (
	"testing"
	"time"

	"github.com/CristianoSword/web-fullstack-study/2-backend/13-go/04-grpc-microservice-go/internal/domain"
)

func TestAuthServiceLoginAndValidate(t *testing.T) {
	authService := newTestAuthService(t)
	now := time.Date(2026, 6, 29, 12, 0, 0, 0, time.UTC)

	session, err := authService.Login("admin", "admin123", now)
	if err != nil {
		t.Fatalf("expected login to succeed, got %v", err)
	}
	if session.Token == "" {
		t.Fatalf("expected generated token")
	}

	validated, err := authService.ValidateToken(session.Token, now.Add(time.Minute))
	if err != nil {
		t.Fatalf("expected token validation to succeed, got %v", err)
	}
	if validated.Username != "admin" || validated.Role != "admin" {
		t.Fatalf("unexpected validated session: %#v", validated)
	}
}

func TestAuthServiceValidationFailures(t *testing.T) {
	authService := newTestAuthService(t)
	now := time.Date(2026, 6, 29, 12, 0, 0, 0, time.UTC)

	if _, err := authService.Login("admin", "wrong", now); err == nil {
		t.Fatalf("expected invalid credentials to fail")
	}

	session, err := authService.Login("admin", "admin123", now)
	if err != nil {
		t.Fatalf("expected login to succeed, got %v", err)
	}

	if _, err := authService.ValidateToken(session.Token, now.Add(3*time.Minute)); err == nil {
		t.Fatalf("expected expired token to fail")
	}
}

func TestAuthServiceCleanup(t *testing.T) {
	authService := newTestAuthService(t)
	now := time.Date(2026, 6, 29, 12, 0, 0, 0, time.UTC)

	session, err := authService.Login("admin", "admin123", now)
	if err != nil {
		t.Fatalf("expected login to succeed, got %v", err)
	}
	removed := authService.CleanupExpired(now.Add(3 * time.Minute))
	if removed != 1 {
		t.Fatalf("expected one expired session removed, got %d", removed)
	}
	if _, err := authService.ValidateToken(session.Token, now.Add(3*time.Minute)); err == nil {
		t.Fatalf("expected cleaned token to be gone")
	}
}

func newTestAuthService(t *testing.T) *AuthService {
	t.Helper()

	authService, err := NewAuthService([]domain.User{
		{ID: "user-001", Username: "admin", Password: "admin123", Role: "admin"},
		{ID: "user-002", Username: "analyst", Password: "analyst123", Role: "analyst"},
	}, 2*time.Minute)
	if err != nil {
		t.Fatalf("expected auth service setup, got %v", err)
	}
	return authService
}
