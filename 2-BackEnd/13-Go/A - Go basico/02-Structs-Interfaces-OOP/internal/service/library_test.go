package service

import (
	"strings"
	"testing"

	"github.com/CristianoSword/web-fullstack-study/2-backend/13-go/02-structs-interfaces-oop/internal/repository"
)

func TestBorrowAndReturnLifecycle(t *testing.T) {
	repo := repository.NewMemoryRepository()
	notifierOutput := &strings.Builder{}
	svc := NewLibraryService(repo, NewWriterNotifier(notifierOutput))

	loan, err := svc.BorrowBook("bk-100", "mb-001")
	if err != nil {
		t.Fatalf("unexpected borrow error: %v", err)
	}
	if loan.Status != "open" {
		t.Fatalf("expected open loan, got %s", loan.Status)
	}

	returned, err := svc.ReturnBook(loan.ID)
	if err != nil {
		t.Fatalf("unexpected return error: %v", err)
	}
	if returned.Status != "returned" {
		t.Fatalf("expected returned status, got %s", returned.Status)
	}
}

func TestBorrowRejectsInactiveMember(t *testing.T) {
	repo := repository.NewMemoryRepository()
	svc := NewLibraryService(repo, NewWriterNotifier(&strings.Builder{}))

	_, err := svc.BorrowBook("bk-100", "mb-003")
	if err == nil {
		t.Fatal("expected inactive member borrow to fail")
	}
}
