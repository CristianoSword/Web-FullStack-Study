package domain

import "time"

type ScrapeResult struct {
	URL        string
	StatusCode int
	Title      string
	Headings   []string
	Links      int
	Words      int
	Keywords   []WordCount
	Duration   time.Duration
	Retries    int
	Error      string
	ScrapedAt  time.Time
}

type WordCount struct {
	Word  string
	Count int
}
