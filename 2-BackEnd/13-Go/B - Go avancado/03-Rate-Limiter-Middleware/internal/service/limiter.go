package service

import (
	"fmt"
	"sync"
	"time"

	"github.com/CristianoSword/web-fullstack-study/2-backend/13-go/03-rate-limiter-middleware/internal/domain"
)

type Limiter struct {
	config  domain.RateLimitConfig
	clients map[string]*domain.ClientState
	metrics domain.Metrics
	mu      sync.Mutex
}

func NewLimiter(config domain.RateLimitConfig) (*Limiter, error) {
	if config.Capacity <= 0 {
		return nil, fmt.Errorf("capacity must be greater than zero")
	}
	if config.RefillTokens <= 0 {
		return nil, fmt.Errorf("refill tokens must be greater than zero")
	}
	if config.RefillInterval <= 0 {
		return nil, fmt.Errorf("refill interval must be greater than zero")
	}
	if config.Burst <= 0 {
		config.Burst = config.Capacity
	}
	if config.CleanupInterval <= 0 {
		config.CleanupInterval = time.Minute
	}
	if config.EntryTTL <= 0 {
		config.EntryTTL = 5 * time.Minute
	}

	return &Limiter{
		config:  config,
		clients: make(map[string]*domain.ClientState),
	}, nil
}

func (l *Limiter) Allow(ip string, now time.Time) domain.RateLimitDecision {
	l.mu.Lock()
	defer l.mu.Unlock()

	state := l.getOrCreateState(ip, now)
	l.refill(state, now)
	state.LastSeenAt = now

	if state.Tokens > 0 {
		state.Tokens--
		state.Allowed++
		l.metrics.AllowedTotal++
		return domain.RateLimitDecision{
			Allowed:         true,
			RemainingTokens: state.Tokens,
			RetryAfter:      0,
			ResetAt:         now.Add(l.config.RefillInterval),
		}
	}

	state.Blocked++
	l.metrics.BlockedTotal++
	retryAfter := int(time.Until(state.LastRefillAt.Add(l.config.RefillInterval)).Seconds())
	if retryAfter < 1 {
		retryAfter = int(l.config.RefillInterval.Seconds())
	}

	return domain.RateLimitDecision{
		Allowed:         false,
		RemainingTokens: 0,
		RetryAfter:      retryAfter,
		ResetAt:         state.LastRefillAt.Add(l.config.RefillInterval),
	}
}

func (l *Limiter) Metrics() domain.Metrics {
	l.mu.Lock()
	defer l.mu.Unlock()

	metrics := l.metrics
	metrics.TrackedClients = len(l.clients)
	return metrics
}

func (l *Limiter) Cleanup(now time.Time) int {
	l.mu.Lock()
	defer l.mu.Unlock()

	removed := 0
	for ip, state := range l.clients {
		if now.Sub(state.LastSeenAt) > l.config.EntryTTL {
			delete(l.clients, ip)
			removed++
		}
	}
	return removed
}

func (l *Limiter) getOrCreateState(ip string, now time.Time) *domain.ClientState {
	if state, ok := l.clients[ip]; ok {
		return state
	}
	state := &domain.ClientState{
		IP:           ip,
		Tokens:       min(l.config.Burst, l.config.Capacity),
		LastRefillAt: now,
		LastSeenAt:   now,
	}
	l.clients[ip] = state
	return state
}

func (l *Limiter) refill(state *domain.ClientState, now time.Time) {
	elapsed := now.Sub(state.LastRefillAt)
	if elapsed < l.config.RefillInterval {
		return
	}

	intervals := int(elapsed / l.config.RefillInterval)
	state.Tokens += intervals * l.config.RefillTokens
	if state.Tokens > l.config.Capacity {
		state.Tokens = l.config.Capacity
	}
	state.LastRefillAt = state.LastRefillAt.Add(time.Duration(intervals) * l.config.RefillInterval)
}
