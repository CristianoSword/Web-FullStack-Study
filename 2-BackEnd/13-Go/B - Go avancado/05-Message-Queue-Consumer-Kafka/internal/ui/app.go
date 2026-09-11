package ui

import (
	"context"
	"flag"
	"fmt"
	"io"
	"strings"
	"time"

	"github.com/CristianoSword/web-fullstack-study/2-backend/13-go/05-message-queue-consumer-kafka/internal/domain"
	"github.com/CristianoSword/web-fullstack-study/2-backend/13-go/05-message-queue-consumer-kafka/internal/service"
	transportkafka "github.com/CristianoSword/web-fullstack-study/2-backend/13-go/05-message-queue-consumer-kafka/internal/transport/kafka"
	transportmock "github.com/CristianoSword/web-fullstack-study/2-backend/13-go/05-message-queue-consumer-kafka/internal/transport/mock"
	transportrabbitmq "github.com/CristianoSword/web-fullstack-study/2-backend/13-go/05-message-queue-consumer-kafka/internal/transport/rabbitmq"
)

type App struct {
	out io.Writer
}

func NewApp(out io.Writer) *App {
	return &App{out: out}
}

func (a *App) Run(ctx context.Context, args []string) error {
	flags := flag.NewFlagSet("bridge", flag.ContinueOnError)
	flags.SetOutput(a.out)

	mode := flags.String("mode", "publish", "publish or consume")
	broker := flags.String("broker", string(domain.BrokerMock), "mock, kafka or rabbitmq")
	address := flags.String("address", "localhost:9092", "broker address or rabbitmq amqp url")
	topic := flags.String("topic", "events", "kafka topic or rabbitmq queue")
	groupID := flags.String("group", "go-bridge", "consumer group for kafka")
	filePath := flags.String("file", "examples/events.jsonl", "jsonl file with events")
	retryLimit := flags.Int("retry-limit", 2, "handler retry attempts")

	if err := flags.Parse(args); err != nil {
		return err
	}

	config := domain.BridgeConfig{
		Broker:        domain.BrokerKind(strings.ToLower(*broker)),
		Address:       *address,
		GroupID:       *groupID,
		ConsumerTopic: *topic,
		ProducerTopic: *topic,
		RetryLimit:    *retryLimit,
		PollInterval:  time.Second,
		ShutdownWait:  3 * time.Second,
	}

	switch config.Broker {
	case domain.BrokerMock:
		return a.runMock(ctx, config, *mode, *filePath)
	case domain.BrokerKafka:
		return a.runKafka(ctx, config, *mode, *filePath)
	case domain.BrokerRabbitMQ:
		return a.runRabbitMQ(ctx, config, *mode, *filePath)
	default:
		return fmt.Errorf("unsupported broker %s", config.Broker)
	}
}

func (a *App) runMock(ctx context.Context, config domain.BridgeConfig, mode string, filePath string) error {
	broker := transportmock.NewBroker()
	bridge := service.NewBridgeService(broker, broker, config.RetryLimit)

	switch mode {
	case "publish":
		events, err := service.LoadEvents(filePath)
		if err != nil {
			return err
		}
		results, err := bridge.PublishBatch(ctx, events)
		if err != nil {
			return err
		}
		for _, result := range results {
			fmt.Fprintf(a.out, "published event=%s delivered=%t attempts=%d\n", result.EventID, result.Delivered, result.Attempts)
		}
	case "consume":
		events, err := service.LoadEvents(filePath)
		if err != nil {
			return err
		}
		if _, err := bridge.PublishBatch(ctx, events); err != nil {
			return err
		}
		if err := bridge.Consume(ctx, service.LoggingHandler{}); err != nil {
			return err
		}
		fmt.Fprintln(a.out, "consumed mock events successfully")
	default:
		return fmt.Errorf("unsupported mode %s", mode)
	}
	return nil
}

func (a *App) runKafka(ctx context.Context, config domain.BridgeConfig, mode string, filePath string) error {
	switch mode {
	case "publish":
		producer := transportkafka.NewProducer(config.Address, config.ProducerTopic)
		defer producer.Close()
		bridge := service.NewBridgeService(producer, transportmock.NewBroker(), config.RetryLimit)
		events, err := service.LoadEvents(filePath)
		if err != nil {
			return err
		}
		results, err := bridge.PublishBatch(ctx, events)
		if err != nil {
			return err
		}
		for _, result := range results {
			fmt.Fprintf(a.out, "kafka published event=%s delivered=%t\n", result.EventID, result.Delivered)
		}
	case "consume":
		consumer := transportkafka.NewConsumer(config.Address, config.ConsumerTopic, config.GroupID)
		defer consumer.Close()
		bridge := service.NewBridgeService(transportmock.NewBroker(), consumer, config.RetryLimit)
		return bridge.Consume(ctx, service.LoggingHandler{})
	default:
		return fmt.Errorf("unsupported mode %s", mode)
	}
	return nil
}

func (a *App) runRabbitMQ(ctx context.Context, config domain.BridgeConfig, mode string, filePath string) error {
	switch mode {
	case "publish":
		producer, err := transportrabbitmq.NewProducer(config.Address, config.ProducerTopic)
		if err != nil {
			return err
		}
		defer producer.Close()
		bridge := service.NewBridgeService(producer, transportmock.NewBroker(), config.RetryLimit)
		events, err := service.LoadEvents(filePath)
		if err != nil {
			return err
		}
		results, err := bridge.PublishBatch(ctx, events)
		if err != nil {
			return err
		}
		for _, result := range results {
			fmt.Fprintf(a.out, "rabbitmq published event=%s delivered=%t\n", result.EventID, result.Delivered)
		}
	case "consume":
		consumer, err := transportrabbitmq.NewConsumer(config.Address, config.ConsumerTopic)
		if err != nil {
			return err
		}
		defer consumer.Close()
		bridge := service.NewBridgeService(transportmock.NewBroker(), consumer, config.RetryLimit)
		return bridge.Consume(ctx, service.LoggingHandler{})
	default:
		return fmt.Errorf("unsupported mode %s", mode)
	}
	return nil
}
