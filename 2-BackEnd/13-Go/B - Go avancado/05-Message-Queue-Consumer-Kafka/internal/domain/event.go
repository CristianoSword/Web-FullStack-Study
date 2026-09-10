package domain

import "time"

type Event struct {
	ID         string            `json:"id"`
	Topic      string            `json:"topic"`
	Key        string            `json:"key"`
	Payload    string            `json:"payload"`
	Headers    map[string]string `json:"headers"`
	OccurredAt time.Time         `json:"occurred_at"`
	Attempts   int               `json:"attempts"`
}
