package domain

import "time"

type RateLimitDecision struct {
	Allowed         bool      `json:"allowed"`
	RemainingTokens int       `json:"remaining_tokens"`
	RetryAfter      int       `json:"retry_after_seconds"`
	ResetAt         time.Time `json:"reset_at"`
}
