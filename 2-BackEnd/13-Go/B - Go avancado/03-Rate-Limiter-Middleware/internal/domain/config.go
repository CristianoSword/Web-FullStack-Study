package domain

import "time"

type RateLimitConfig struct {
	Capacity        int
	RefillTokens    int
	RefillInterval  time.Duration
	Burst           int
	CleanupInterval time.Duration
	EntryTTL        time.Duration
}
