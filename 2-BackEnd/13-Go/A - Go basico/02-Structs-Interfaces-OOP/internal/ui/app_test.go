package ui

import (
	"strings"
	"testing"

	"github.com/CristianoSword/web-fullstack-study/2-backend/13-go/02-structs-interfaces-oop/internal/repository"
	"github.com/CristianoSword/web-fullstack-study/2-backend/13-go/02-structs-interfaces-oop/internal/service"
)

func TestCLITranscript(t *testing.T) {
	input := strings.NewReader("list-books\nborrow bk-100 mb-001\nlist-loans\nreturn loan-001\nexit\n")
	output := &strings.Builder{}
	repo := repository.NewMemoryRepository()
	svc := service.NewLibraryService(repo, service.NewWriterNotifier(output))
	app := NewApp(input, output, svc)

	if err := app.Run(); err != nil {
		t.Fatalf("unexpected cli error: %v", err)
	}

	transcript := output.String()
	for _, expected := range []string{
		"Library Management CLI",
		"bk-100 | Clean Code",
		"Loan created: loan-001",
		"loan-001 | book=bk-100 | member=mb-001 | status=open",
		"Loan returned: loan-001 status=returned",
		"Bye.",
	} {
		if !strings.Contains(transcript, expected) {
			t.Fatalf("expected transcript to contain %q, got %q", expected, transcript)
		}
	}
}
