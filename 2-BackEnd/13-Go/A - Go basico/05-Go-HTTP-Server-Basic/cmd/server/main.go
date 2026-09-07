package main

import (
	"log"
	"net/http"
	"os"

	"github.com/CristianoSword/web-fullstack-study/2-backend/13-go/05-go-http-server-basic/internal/domain"
	"github.com/CristianoSword/web-fullstack-study/2-backend/13-go/05-go-http-server-basic/internal/service"
	"github.com/CristianoSword/web-fullstack-study/2-backend/13-go/05-go-http-server-basic/internal/ui"
)

func main() {
	catalog, err := service.NewCatalogService(seedBooks())
	if err != nil {
		log.Fatalf("bootstrap catalog: %v", err)
	}

	handler := ui.NewHTTPHandler(catalog)
	address := ":8080"
	if value := os.Getenv("PORT"); value != "" {
		address = ":" + value
	}

	log.Printf("server listening on %s", address)
	if err := http.ListenAndServe(address, handler); err != nil {
		log.Fatalf("http server stopped: %v", err)
	}
}

func seedBooks() []domain.Book {
	return []domain.Book{
		{
			Title:       "Go Concurrency at Scale",
			Author:      "Cristiano Sword",
			Category:    "backend",
			Description: "Patterns for resilient services built with goroutines and channels.",
		},
		{
			Title:       "HTTP APIs with net/http",
			Author:      "Open Study",
			Category:    "api",
			Description: "A pragmatic introduction to building JSON APIs without external frameworks.",
		},
	}
}
