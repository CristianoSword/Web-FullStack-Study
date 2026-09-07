package main

import (
	"context"
	"log"
	"os"
	"time"

	"github.com/CristianoSword/web-fullstack-study/2-backend/13-go/01-concurrent-web-scraper-goroutines/internal/ui"
)

func main() {
	ctx, cancel := context.WithTimeout(context.Background(), 30*time.Second)
	defer cancel()

	app := ui.NewApp(os.Stdout)
	if err := app.Run(ctx, os.Args[1:]); err != nil {
		log.Fatalf("scraper failed: %v", err)
	}
}
