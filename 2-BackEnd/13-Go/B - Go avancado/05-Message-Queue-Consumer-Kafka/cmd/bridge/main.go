package main

import (
	"context"
	"log"
	"os"

	"github.com/CristianoSword/web-fullstack-study/2-backend/13-go/05-message-queue-consumer-kafka/internal/ui"
)

func main() {
	app := ui.NewApp(os.Stdout)
	if err := app.Run(context.Background(), os.Args[1:]); err != nil {
		log.Fatalf("bridge command failed: %v", err)
	}
}
