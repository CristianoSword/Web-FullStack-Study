package main

import (
	"log"
	"os"
	"path/filepath"

	"github.com/CristianoSword/web-fullstack-study/2-backend/13-go/02-rest-api-gin-gorm/internal/service"
	"github.com/CristianoSword/web-fullstack-study/2-backend/13-go/02-rest-api-gin-gorm/internal/ui"
)

func main() {
	if err := os.MkdirAll("data", 0o755); err != nil {
		log.Fatalf("create data directory: %v", err)
	}

	databasePath := filepath.Join("data", "tasks.db")
	taskService, err := service.NewTaskService(databasePath)
	if err != nil {
		log.Fatalf("bootstrap task service: %v", err)
	}

	router := ui.NewRouter(taskService)
	if err := router.Run(":8080"); err != nil {
		log.Fatalf("run gin server: %v", err)
	}
}
