package parser

import (
	"testing"

	"github.com/CristianoSword/web-fullstack-study/2-backend/13-go/01-go-syntax-cli/internal/domain"
)

func TestParseCalculationCommand(t *testing.T) {
	command, err := Parse("mul 3 7")
	if err != nil {
		t.Fatalf("unexpected parse error: %v", err)
	}
	if command.Type != domain.CommandCalculation {
		t.Fatalf("expected calculation command, got %s", command.Type)
	}
	if command.Operation != domain.OperationMul {
		t.Fatalf("expected mul operation, got %s", command.Operation)
	}
}

func TestParseUnknownCommand(t *testing.T) {
	_, err := Parse("explode 1 2")
	if err == nil {
		t.Fatal("expected unknown command error")
	}
}
