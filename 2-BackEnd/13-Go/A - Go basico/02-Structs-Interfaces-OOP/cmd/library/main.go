package main

import (
	"log"
	"os"

	"github.com/CristianoSword/web-fullstack-study/2-backend/13-go/02-structs-interfaces-oop/internal/repository"
	"github.com/CristianoSword/web-fullstack-study/2-backend/13-go/02-structs-interfaces-oop/internal/service"
	"github.com/CristianoSword/web-fullstack-study/2-backend/13-go/02-structs-interfaces-oop/internal/ui"
)

func main() {
	repo := repository.NewMemoryRepository()
	notifier := service.NewWriterNotifier(os.Stdout)
	libraryService := service.NewLibraryService(repo, notifier)
	app := ui.NewApp(os.Stdin, os.Stdout, libraryService)

	if err := app.Run(); err != nil {
		log.Fatalf("library cli exited with error: %v", err)
	}
}
