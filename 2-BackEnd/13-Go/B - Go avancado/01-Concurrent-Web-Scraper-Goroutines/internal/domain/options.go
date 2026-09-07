package domain

import "time"

type ScraperOptions struct {
	Concurrency int
	Timeout     time.Duration
	MaxRetries  int
	TopKeywords int
	UserAgent   string
}
