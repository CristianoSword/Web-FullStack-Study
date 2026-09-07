package service

import (
	"testing"

	"github.com/CristianoSword/web-fullstack-study/2-backend/13-go/05-go-http-server-basic/internal/domain"
)

func TestCatalogServiceCreateAndFind(t *testing.T) {
	catalog, err := NewCatalogService(nil)
	if err != nil {
		t.Fatalf("expected catalog setup, got %v", err)
	}

	book, err := catalog.Create(domain.CreateBookRequest{
		Title:       "Testing Go APIs",
		Author:      "Cristiano",
		Category:    "backend",
		Description: "Practical tests for small HTTP services.",
	})
	if err != nil {
		t.Fatalf("expected create to succeed, got %v", err)
	}

	if book.ID == "" {
		t.Fatalf("expected generated id")
	}
	stored, ok := catalog.Find(book.ID)
	if !ok || stored.Title != book.Title {
		t.Fatalf("expected created book to be retrievable")
	}
}

func TestCatalogServiceValidation(t *testing.T) {
	catalog, err := NewCatalogService(nil)
	if err != nil {
		t.Fatalf("expected catalog setup, got %v", err)
	}

	if _, err := catalog.Create(domain.CreateBookRequest{}); err == nil {
		t.Fatalf("expected empty payload to fail validation")
	}
}
