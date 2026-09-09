package main

import (
	"log"
	"net/http"
	"time"

	"github.com/CristianoSword/web-fullstack-study/2-backend/13-go/03-rate-limiter-middleware/internal/domain"
	"github.com/CristianoSword/web-fullstack-study/2-backend/13-go/03-rate-limiter-middleware/internal/service"
	"github.com/CristianoSword/web-fullstack-study/2-backend/13-go/03-rate-limiter-middleware/internal/ui"
)

func main() {
	limiter, err := service.NewLimiter(domain.RateLimitConfig{
		Capacity:        5,
		RefillTokens:    2,
		RefillInterval:  5 * time.Second,
		Burst:           5,
		CleanupInterval: 30 * time.Second,
		EntryTTL:        2 * time.Minute,
	})
	if err != nil {
		log.Fatalf("create limiter: %v", err)
	}

	handler := ui.NewServer(limiter)
	log.Println("rate limiter server listening on :8080")
	if err := http.ListenAndServe(":8080", handler); err != nil {
		log.Fatalf("listen and serve: %v", err)
	}
}
