package domain

import "context"

type Producer interface {
	Publish(ctx context.Context, event Event) error
	Close() error
}

type Consumer interface {
	Consume(ctx context.Context, handler Handler) error
	Close() error
}

type Handler interface {
	Handle(ctx context.Context, event Event) error
}
