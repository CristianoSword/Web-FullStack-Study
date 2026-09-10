package domain

import "time"

type BrokerKind string

const (
	BrokerKafka    BrokerKind = "kafka"
	BrokerRabbitMQ BrokerKind = "rabbitmq"
	BrokerMock     BrokerKind = "mock"
)

type BridgeConfig struct {
	Broker        BrokerKind
	Address       string
	GroupID       string
	ConsumerTopic string
	ProducerTopic string
	RetryLimit    int
	PollInterval  time.Duration
	ShutdownWait  time.Duration
}
