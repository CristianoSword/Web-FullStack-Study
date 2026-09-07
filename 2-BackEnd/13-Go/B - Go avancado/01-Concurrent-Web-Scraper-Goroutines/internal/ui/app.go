package ui

import (
	"context"
	"flag"
	"fmt"
	"io"
	"path/filepath"
	"strings"
	"time"

	"github.com/CristianoSword/web-fullstack-study/2-backend/13-go/01-concurrent-web-scraper-goroutines/internal/domain"
	"github.com/CristianoSword/web-fullstack-study/2-backend/13-go/01-concurrent-web-scraper-goroutines/internal/service"
)

type App struct {
	out io.Writer
}

func NewApp(out io.Writer) *App {
	return &App{out: out}
}

func (a *App) Run(ctx context.Context, args []string) error {
	flags := flag.NewFlagSet("scraper", flag.ContinueOnError)
	flags.SetOutput(a.out)

	defaultTargets := filepath.Join("config", "targets.txt")
	targetsFile := flags.String("targets", defaultTargets, "path to targets file")
	concurrency := flags.Int("concurrency", 3, "number of concurrent workers")
	timeout := flags.Duration("timeout", 5*time.Second, "per-request timeout")
	retries := flags.Int("retries", 1, "number of retries after the first attempt")
	topKeywords := flags.Int("top-keywords", 5, "top keywords to print per page")

	if err := flags.Parse(args); err != nil {
		return err
	}

	targets, err := service.LoadTargets(*targetsFile)
	if err != nil {
		return err
	}
	scraper, err := service.NewScraperService(domain.ScraperOptions{
		Concurrency: *concurrency,
		Timeout:     *timeout,
		MaxRetries:  *retries,
		TopKeywords: *topKeywords,
		UserAgent:   "WebFullStackStudyScraper/1.0",
	})
	if err != nil {
		return err
	}

	report, err := scraper.ScrapeAll(ctx, targets)
	if err != nil {
		return err
	}
	a.printReport(report)
	return nil
}

func (a *App) printReport(report domain.ScrapeReport) {
	fmt.Fprintf(
		a.out,
		"targets=%d completed=%d failed=%d total-duration=%s avg-latency=%s\n",
		report.TotalTargets,
		report.Completed,
		report.Failed,
		report.TotalDuration.Round(time.Millisecond),
		report.AverageLatency.Round(time.Millisecond),
	)

	for _, result := range report.Results {
		if result.Error != "" {
			fmt.Fprintf(
				a.out,
				"[FAIL] %s status=%d retries=%d duration=%s error=%s\n",
				result.URL,
				result.StatusCode,
				result.Retries,
				result.Duration.Round(time.Millisecond),
				result.Error,
			)
			continue
		}
		fmt.Fprintf(
			a.out,
			"[OK] %s status=%d title=%q links=%d words=%d retries=%d duration=%s\n",
			result.URL,
			result.StatusCode,
			result.Title,
			result.Links,
			result.Words,
			result.Retries,
			result.Duration.Round(time.Millisecond),
		)
		if len(result.Headings) > 0 {
			fmt.Fprintf(a.out, "  headings=%s\n", strings.Join(result.Headings, " | "))
		}
		if len(result.Keywords) > 0 {
			parts := make([]string, 0, len(result.Keywords))
			for _, keyword := range result.Keywords {
				parts = append(parts, fmt.Sprintf("%s=%d", keyword.Word, keyword.Count))
			}
			fmt.Fprintf(a.out, "  keywords=%s\n", strings.Join(parts, ", "))
		}
	}
}
