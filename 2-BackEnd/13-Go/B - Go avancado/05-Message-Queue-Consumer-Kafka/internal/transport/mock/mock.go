package mock

import (
	"context"
	"sync"

	"github.com/CristianoSword/web-fullstack-study/2-backend/13-go/05-message-queue-consumer-kafka/internal/domain"
)

type Broker struct {
	events []domain.Event
	mu     sync.Mutex
}

func NewBroker() *Broker {
	return &Broker{events: make([]domain.Event, 0)}
}

func (b *Broker) Publish(_ context.Context, event domain.Event) error {
	b.mu.Lock()
	defer b.mu.Unlock()
	b.events = append(b.events, event)
	return nil
}

func (b *Broker) Consume(ctx context.Context, handler domain.Handler) error {
	b.mu.Lock()
	events := append([]domain.Event(nil), b.events...)
	b.mu.Unlock()

	for _, event := range events {
		select {
		case <-ctx.Done():
			return ctx.Err()
		default:
		}
		if err := handler.Handle(ctx, event); err != nil {
			return err
		}
	}
	return nil
}

func (b *Broker) Close() error { return nil }
