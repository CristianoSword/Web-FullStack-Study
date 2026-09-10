package domain

import "time"

type DeliveryResult struct {
	EventID     string
	Broker      BrokerKind
	Delivered   bool
	Attempts    int
	DeliveredAt time.Time
	Error       string
}
