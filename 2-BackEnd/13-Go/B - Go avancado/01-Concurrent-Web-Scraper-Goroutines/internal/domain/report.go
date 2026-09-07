package domain

import "time"

type ScrapeReport struct {
	TotalTargets   int
	Completed      int
	Failed         int
	TotalDuration  time.Duration
	AverageLatency time.Duration
	Results        []ScrapeResult
}
