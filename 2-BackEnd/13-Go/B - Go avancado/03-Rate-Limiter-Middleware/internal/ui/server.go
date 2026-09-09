package ui

import (
	"encoding/json"
	"net"
	"net/http"
	"strconv"
	"strings"
	"time"

	"github.com/CristianoSword/web-fullstack-study/2-backend/13-go/03-rate-limiter-middleware/internal/domain"
	"github.com/CristianoSword/web-fullstack-study/2-backend/13-go/03-rate-limiter-middleware/internal/service"
)

func NewServer(limiter *service.Limiter) http.Handler {
	mux := http.NewServeMux()

	go startCleanupLoop(limiter, 30*time.Second)

	mux.HandleFunc("GET /health", func(writer http.ResponseWriter, _ *http.Request) {
		writeJSON(writer, http.StatusOK, map[string]string{"status": "ok"})
	})

	mux.Handle("/metrics", rateLimitMiddleware(limiter, http.HandlerFunc(func(writer http.ResponseWriter, _ *http.Request) {
		writeJSON(writer, http.StatusOK, limiter.Metrics())
	})))

	mux.Handle("/api/ping", rateLimitMiddleware(limiter, http.HandlerFunc(func(writer http.ResponseWriter, request *http.Request) {
		writeJSON(writer, http.StatusOK, map[string]string{
			"message": "pong",
			"path":    request.URL.Path,
		})
	})))

	mux.Handle("/api/time", rateLimitMiddleware(limiter, http.HandlerFunc(func(writer http.ResponseWriter, _ *http.Request) {
		writeJSON(writer, http.StatusOK, map[string]string{
			"time": time.Now().UTC().Format(time.RFC3339),
		})
	})))

	return mux
}

func rateLimitMiddleware(limiter *service.Limiter, next http.Handler) http.Handler {
	return http.HandlerFunc(func(writer http.ResponseWriter, request *http.Request) {
		ip := clientIP(request)
		decision := limiter.Allow(ip, time.Now())

		writer.Header().Set("X-RateLimit-Remaining", jsonNumber(decision.RemainingTokens))
		writer.Header().Set("X-RateLimit-Reset", decision.ResetAt.Format(time.RFC3339))

		if !decision.Allowed {
			writer.Header().Set("Retry-After", jsonNumber(decision.RetryAfter))
			writeJSON(writer, http.StatusTooManyRequests, domain.RateLimitDecision{
				Allowed:         false,
				RemainingTokens: decision.RemainingTokens,
				RetryAfter:      decision.RetryAfter,
				ResetAt:         decision.ResetAt,
			})
			return
		}

		next.ServeHTTP(writer, request)
	})
}

func clientIP(request *http.Request) string {
	if forwarded := strings.TrimSpace(request.Header.Get("X-Forwarded-For")); forwarded != "" {
		parts := strings.Split(forwarded, ",")
		return strings.TrimSpace(parts[0])
	}
	if realIP := strings.TrimSpace(request.Header.Get("X-Real-IP")); realIP != "" {
		return realIP
	}
	host, _, err := net.SplitHostPort(request.RemoteAddr)
	if err != nil {
		return request.RemoteAddr
	}
	return host
}

func startCleanupLoop(limiter *service.Limiter, interval time.Duration) {
	ticker := time.NewTicker(interval)
	defer ticker.Stop()

	for range ticker.C {
		limiter.Cleanup(time.Now())
	}
}

func writeJSON(writer http.ResponseWriter, statusCode int, payload any) {
	writer.Header().Set("Content-Type", "application/json")
	writer.WriteHeader(statusCode)
	_ = json.NewEncoder(writer).Encode(payload)
}

func jsonNumber(value int) string {
	return strconv.Itoa(value)
}
