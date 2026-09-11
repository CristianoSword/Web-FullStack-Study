package kafka

import (
	"context"
	"time"

	kafkago "github.com/segmentio/kafka-go"

	"github.com/CristianoSword/web-fullstack-study/2-backend/13-go/05-message-queue-consumer-kafka/internal/domain"
)

type Producer struct {
	writer *kafkago.Writer
}

func NewProducer(address string, topic string) *Producer {
	return &Producer{
		writer: &kafkago.Writer{
			Addr:         kafkago.TCP(address),
			Topic:        topic,
			RequiredAcks: kafkago.RequireOne,
			Balancer:     &kafkago.LeastBytes{},
		},
	}
}

func (p *Producer) Publish(ctx context.Context, event domain.Event) error {
	return p.writer.WriteMessages(ctx, kafkago.Message{
		Key:     []byte(event.Key),
		Value:   []byte(event.Payload),
		Headers: toKafkaHeaders(event.Headers),
		Time:    time.Now().UTC(),
	})
}

func (p *Producer) Close() error { return p.writer.Close() }

type Consumer struct {
	reader *kafkago.Reader
}

func NewConsumer(address string, topic string, groupID string) *Consumer {
	return &Consumer{
		reader: kafkago.NewReader(kafkago.ReaderConfig{
			Brokers: []string{address},
			GroupID: groupID,
			Topic:   topic,
		}),
	}
}

func (c *Consumer) Consume(ctx context.Context, handler domain.Handler) error {
	for {
		message, err := c.reader.FetchMessage(ctx)
		if err != nil {
			return err
		}

		event := domain.Event{
			ID:         string(message.Key),
			Key:        string(message.Key),
			Topic:      message.Topic,
			Payload:    string(message.Value),
			OccurredAt: message.Time,
			Headers:    fromKafkaHeaders(message.Headers),
		}

		if err := handler.Handle(ctx, event); err != nil {
			return err
		}
		if err := c.reader.CommitMessages(ctx, message); err != nil {
			return err
		}
	}
}

func (c *Consumer) Close() error { return c.reader.Close() }

func toKafkaHeaders(headers map[string]string) []kafkago.Header {
	items := make([]kafkago.Header, 0, len(headers))
	for key, value := range headers {
		items = append(items, kafkago.Header{Key: key, Value: []byte(value)})
	}
	return items
}

func fromKafkaHeaders(headers []kafkago.Header) map[string]string {
	items := make(map[string]string, len(headers))
	for _, header := range headers {
		items[header.Key] = string(header.Value)
	}
	return items
}
