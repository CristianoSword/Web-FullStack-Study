package service

import (
	"testing"
	"time"

	"github.com/CristianoSword/web-fullstack-study/2-backend/13-go/03-rate-limiter-middleware/internal/domain"
)

func TestLimiterAllowAndBlock(t *testing.T) {
	limiter := newTestLimiter(t)
	now := time.Date(2026, 6, 29, 12, 0, 0, 0, time.UTC)

	first := limiter.Allow("192.168.0.10", now)
	second := limiter.Allow("192.168.0.10", now.Add(10*time.Millisecond))
	third := limiter.Allow("192.168.0.10", now.Add(20*time.Millisecond))

	if !first.Allowed || !second.Allowed {
		t.Fatalf("expected first two requests to pass")
	}
	if third.Allowed {
		t.Fatalf("expected third request to be blocked")
	}
	if third.RetryAfter <= 0 {
		t.Fatalf("expected blocked decision to include retry-after")
	}
}

func TestLimiterRefillAndCleanup(t *testing.T) {
	limiter := newTestLimiter(t)
	now := time.Date(2026, 6, 29, 12, 0, 0, 0, time.UTC)

	_ = limiter.Allow("10.0.0.1", now)
	_ = limiter.Allow("10.0.0.1", now.Add(50*time.Millisecond))
	blocked := limiter.Allow("10.0.0.1", now.Add(100*time.Millisecond))
	if blocked.Allowed {
		t.Fatalf("expected request to be blocked before refill")
	}

	refilled := limiter.Allow("10.0.0.1", now.Add(2*time.Second))
	if !refilled.Allowed {
		t.Fatalf("expected request to pass after refill")
	}

	removed := limiter.Cleanup(now.Add(6 * time.Minute))
	if removed != 1 {
		t.Fatalf("expected one client removed, got %d", removed)
	}
}

func TestLimiterMetrics(t *testing.T) {
	limiter := newTestLimiter(t)
	now := time.Date(2026, 6, 29, 12, 0, 0, 0, time.UTC)

	_ = limiter.Allow("10.0.0.1", now)
	_ = limiter.Allow("10.0.0.1", now.Add(10*time.Millisecond))
	_ = limiter.Allow("10.0.0.1", now.Add(20*time.Millisecond))

	metrics := limiter.Metrics()
	if metrics.TrackedClients != 1 || metrics.AllowedTotal != 2 || metrics.BlockedTotal != 1 {
		t.Fatalf("unexpected metrics: %#v", metrics)
	}
}

func newTestLimiter(t *testing.T) *Limiter {
	t.Helper()

	limiter, err := NewLimiter(domain.RateLimitConfig{
		Capacity:        2,
		RefillTokens:    1,
		RefillInterval:  time.Second,
		Burst:           2,
		CleanupInterval: time.Minute,
		EntryTTL:        5 * time.Minute,
	})
	if err != nil {
		t.Fatalf("expected limiter setup, got %v", err)
	}
	return limiter
}
