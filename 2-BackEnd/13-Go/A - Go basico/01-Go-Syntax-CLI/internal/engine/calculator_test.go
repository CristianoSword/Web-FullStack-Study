package engine

import (
	"testing"

	"github.com/CristianoSword/web-fullstack-study/2-backend/13-go/01-go-syntax-cli/internal/domain"
)

func TestCalculateAdd(t *testing.T) {
	result, err := Calculate(domain.OperationAdd, []float64{10, 5, 2})
	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}
	if result != 17 {
		t.Fatalf("expected 17, got %v", result)
	}
}

func TestCalculateDivisionByZero(t *testing.T) {
	_, err := Calculate(domain.OperationDiv, []float64{10, 0})
	if err == nil {
		t.Fatal("expected division by zero error")
	}
}
