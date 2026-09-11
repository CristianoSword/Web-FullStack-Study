package service

import (
	"context"
	"encoding/json"
	"fmt"
	"os"
	"strings"
	"time"

	"github.com/CristianoSword/web-fullstack-study/2-backend/13-go/05-message-queue-consumer-kafka/internal/domain"
)

type BridgeService struct {
	producer   domain.Producer
	consumer   domain.Consumer
	retryLimit int
}

func NewBridgeService(producer domain.Producer, consumer domain.Consumer, retryLimit int) *BridgeService {
	return &BridgeService{
		producer:   producer,
		consumer:   consumer,
		retryLimit: retryLimit,
	}
}

func (s *BridgeService) PublishBatch(ctx context.Context, events []domain.Event) ([]domain.DeliveryResult, error) {
	results := make([]domain.DeliveryResult, 0, len(events))
	for _, event := range events {
		if err := validateEvent(event); err != nil {
			return nil, err
		}
		err := s.producer.Publish(ctx, event)
		result := domain.DeliveryResult{
			EventID:     event.ID,
			Delivered:   err == nil,
			Attempts:    1,
			DeliveredAt: time.Now().UTC(),
		}
		if err != nil {
			result.Error = err.Error()
		}
		results = append(results, result)
	}
	return results, nil
}

func (s *BridgeService) Consume(ctx context.Context, handler domain.Handler) error {
	return s.consumer.Consume(ctx, &retryingHandler{
		next:       handler,
		retryLimit: s.retryLimit,
	})
}

func LoadEvents(path string) ([]domain.Event, error) {
	data, err := os.ReadFile(path)
	if err != nil {
		return nil, fmt.Errorf("read events file: %w", err)
	}

	lines := strings.Split(strings.TrimSpace(string(data)), "\n")
	events := make([]domain.Event, 0, len(lines))
	for _, line := range lines {
		if strings.TrimSpace(line) == "" {
			continue
		}
		var event domain.Event
		if err := json.Unmarshal([]byte(line), &event); err != nil {
			return nil, fmt.Errorf("parse jsonl line: %w", err)
		}
		if event.OccurredAt.IsZero() {
			event.OccurredAt = time.Now().UTC()
		}
		events = append(events, event)
	}
	return events, nil
}

type retryingHandler struct {
	next       domain.Handler
	retryLimit int
}

func (h *retryingHandler) Handle(ctx context.Context, event domain.Event) error {
	var lastErr error
	for attempt := 0; attempt <= h.retryLimit; attempt++ {
		event.Attempts = attempt + 1
		if err := h.next.Handle(ctx, event); err != nil {
			lastErr = err
			continue
		}
		return nil
	}
	return lastErr
}

type LoggingHandler struct{}

func (LoggingHandler) Handle(_ context.Context, event domain.Event) error {
	if err := validateEvent(event); err != nil {
		return err
	}
	return nil
}

func validateEvent(event domain.Event) error {
	if strings.TrimSpace(event.ID) == "" {
		return fmt.Errorf("event id is required")
	}
	if strings.TrimSpace(event.Topic) == "" {
		return fmt.Errorf("event topic is required")
	}
	if strings.TrimSpace(event.Payload) == "" {
		return fmt.Errorf("event payload is required")
	}
	return nil
}
