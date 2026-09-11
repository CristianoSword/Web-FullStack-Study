package rabbitmq

import (
	"context"
	"time"

	amqp "github.com/rabbitmq/amqp091-go"

	"github.com/CristianoSword/web-fullstack-study/2-backend/13-go/05-message-queue-consumer-kafka/internal/domain"
)

type Producer struct {
	connection *amqp.Connection
	channel    *amqp.Channel
	queue      string
}

func NewProducer(address string, queue string) (*Producer, error) {
	connection, err := amqp.Dial(address)
	if err != nil {
		return nil, err
	}
	channel, err := connection.Channel()
	if err != nil {
		_ = connection.Close()
		return nil, err
	}
	if _, err := channel.QueueDeclare(queue, true, false, false, false, nil); err != nil {
		_ = channel.Close()
		_ = connection.Close()
		return nil, err
	}
	return &Producer{connection: connection, channel: channel, queue: queue}, nil
}

func (p *Producer) Publish(ctx context.Context, event domain.Event) error {
	return p.channel.PublishWithContext(ctx, "", p.queue, false, false, amqp.Publishing{
		ContentType: "application/json",
		MessageId:   event.ID,
		Body:        []byte(event.Payload),
		Timestamp:   time.Now().UTC(),
		Headers:     toRabbitHeaders(event.Headers),
		Type:        event.Topic,
	})
}

func (p *Producer) Close() error {
	if err := p.channel.Close(); err != nil {
		_ = p.connection.Close()
		return err
	}
	return p.connection.Close()
}

type Consumer struct {
	connection *amqp.Connection
	channel    *amqp.Channel
	queue      string
}

func NewConsumer(address string, queue string) (*Consumer, error) {
	connection, err := amqp.Dial(address)
	if err != nil {
		return nil, err
	}
	channel, err := connection.Channel()
	if err != nil {
		_ = connection.Close()
		return nil, err
	}
	if _, err := channel.QueueDeclare(queue, true, false, false, false, nil); err != nil {
		_ = channel.Close()
		_ = connection.Close()
		return nil, err
	}
	return &Consumer{connection: connection, channel: channel, queue: queue}, nil
}

func (c *Consumer) Consume(ctx context.Context, handler domain.Handler) error {
	deliveries, err := c.channel.Consume(c.queue, "", false, false, false, false, nil)
	if err != nil {
		return err
	}

	for {
		select {
		case <-ctx.Done():
			return ctx.Err()
		case delivery, ok := <-deliveries:
			if !ok {
				return nil
			}
			event := domain.Event{
				ID:         delivery.MessageId,
				Key:        delivery.MessageId,
				Topic:      delivery.Type,
				Payload:    string(delivery.Body),
				OccurredAt: delivery.Timestamp,
				Headers:    fromRabbitHeaders(delivery.Headers),
			}
			if err := handler.Handle(ctx, event); err != nil {
				_ = delivery.Nack(false, true)
				return err
			}
			if err := delivery.Ack(false); err != nil {
				return err
			}
		}
	}
}

func (c *Consumer) Close() error {
	if err := c.channel.Close(); err != nil {
		_ = c.connection.Close()
		return err
	}
	return c.connection.Close()
}

func toRabbitHeaders(headers map[string]string) amqp.Table {
	table := amqp.Table{}
	for key, value := range headers {
		table[key] = value
	}
	return table
}

func fromRabbitHeaders(headers amqp.Table) map[string]string {
	table := make(map[string]string, len(headers))
	for key, value := range headers {
		if stringValue, ok := value.(string); ok {
			table[key] = stringValue
		}
	}
	return table
}
