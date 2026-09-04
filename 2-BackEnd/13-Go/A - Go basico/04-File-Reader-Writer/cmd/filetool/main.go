package main

import (
	"log"
	"os"
	"path/filepath"

	"github.com/CristianoSword/web-fullstack-study/2-backend/13-go/04-file-reader-writer/internal/domain"
	"github.com/CristianoSword/web-fullstack-study/2-backend/13-go/04-file-reader-writer/internal/service"
	"github.com/CristianoSword/web-fullstack-study/2-backend/13-go/04-file-reader-writer/internal/ui"
)

func main() {
	baseDirectory, err := filepath.Abs("samples")
	if err != nil {
		log.Fatalf("resolve samples directory: %v", err)
	}

	fileService, err := service.NewFileService(domain.ReaderOptions{
		BaseDirectory:    baseDirectory,
		MaxFileSizeBytes: 1024 * 1024,
		TopWordLimit:     5,
	})
	if err != nil {
		log.Fatalf("bootstrap file service: %v", err)
	}

	app := ui.NewApp(os.Stdin, os.Stdout, fileService)
	if err := app.Run(); err != nil {
		log.Fatalf("file tool exited with error: %v", err)
	}
}
