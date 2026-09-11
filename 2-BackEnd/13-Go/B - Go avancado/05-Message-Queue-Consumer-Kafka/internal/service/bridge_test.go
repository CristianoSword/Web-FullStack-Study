package service

import (
	"context"
	"os"
	"path/filepath"
	"testing"
	"time"

	"github.com/CristianoSword/web-fullstack-study/2-backend/13-go/05-message-queue-consumer-kafka/internal/domain"
	transportmock "github.com/CristianoSword/web-fullstack-study/2-backend/13-go/05-message-queue-consumer-kafka/internal/transport/mock"
)

func TestLoadEventsAndPublishBatch(t *testing.T) {
	tempDir := t.TempDir()
	path := filepath.Join(tempDir, "events.jsonl")
	content := "{\"id\":\"evt-001\",\"topic\":\"orders.created\",\"payload\":\"{\\\"id\\\":1}\"}\n"
	if err := os.WriteFile(path, []byte(content), 0o644); err != nil {
		t.Fatalf("write events file: %v", err)
	}

	events, err := LoadEvents(path)
	if err != nil {
		t.Fatalf("expected load events to succeed, got %v", err)
	}
	if len(events) != 1 || events[0].ID != "evt-001" {
		t.Fatalf("unexpected events: %#v", events)
	}

	broker := transportmock.NewBroker()
	bridge := NewBridgeService(broker, broker, 1)
	results, err := bridge.PublishBatch(context.Background(), events)
	if err != nil {
		t.Fatalf("expected publish batch to succeed, got %v", err)
	}
	if len(results) != 1 || !results[0].Delivered {
		t.Fatalf("unexpected results: %#v", results)
	}
}

func TestConsumeWithRetryingHandler(t *testing.T) {
	broker := transportmock.NewBroker()
	bridge := NewBridgeService(broker, broker, 2)

	events := []domain.Event{
		{
			ID:         "evt-001",
			Topic:      "orders.created",
			Payload:    "{\"order_id\":\"ord-1\"}",
			OccurredAt: time.Now().UTC(),
		},
	}
	if _, err := bridge.PublishBatch(context.Background(), events); err != nil {
		t.Fatalf("expected seed publish to succeed, got %v", err)
	}

	handler := &countingHandler{}
	if err := bridge.Consume(context.Background(), handler); err != nil {
		t.Fatalf("expected consume to succeed, got %v", err)
	}
	if handler.calls != 1 {
		t.Fatalf("expected one handled event, got %d", handler.calls)
	}
}

type countingHandler struct {
	calls int
}

func (h *countingHandler) Handle(_ context.Context, event domain.Event) error {
	h.calls++
	return validateEvent(event)
}
