package service

import (
	"context"
	"os"
	"path/filepath"
	"strings"
	"testing"
	"time"

	"net/http"
	"net/http/httptest"

	"github.com/CristianoSword/web-fullstack-study/2-backend/13-go/01-concurrent-web-scraper-goroutines/internal/domain"
)

func TestLoadTargets(t *testing.T) {
	tempDir := t.TempDir()
	path := filepath.Join(tempDir, "targets.txt")
	content := strings.Join([]string{
		"# comment",
		"",
		"https://example.com",
		"https://go.dev",
	}, "\n")
	if err := os.WriteFile(path, []byte(content), 0o644); err != nil {
		t.Fatalf("write targets file: %v", err)
	}

	targets, err := LoadTargets(path)
	if err != nil {
		t.Fatalf("expected targets to load, got %v", err)
	}
	if len(targets) != 2 {
		t.Fatalf("expected 2 targets, got %d", len(targets))
	}
}

func TestScrapeAll(t *testing.T) {
	server := httptest.NewServer(http.HandlerFunc(func(writer http.ResponseWriter, request *http.Request) {
		switch request.URL.Path {
		case "/page-1":
			writer.WriteHeader(http.StatusOK)
			_, _ = writer.Write([]byte(`<html><head><title>Page One</title></head><body><h1>Welcome</h1><a href="/docs">Docs</a><p>Go scraping example example</p></body></html>`))
		case "/page-2":
			writer.WriteHeader(http.StatusOK)
			_, _ = writer.Write([]byte(`<html><head><title>Page Two</title></head><body><h2>Updates</h2><a href="/news">News</a><a href="/blog">Blog</a><p>Concurrency with goroutines and channels</p></body></html>`))
		default:
			writer.WriteHeader(http.StatusNotFound)
		}
	}))
	defer server.Close()

	scraper, err := NewScraperService(domain.ScraperOptions{
		Concurrency: 2,
		Timeout:     2 * time.Second,
		MaxRetries:  1,
		TopKeywords: 3,
		UserAgent:   "test-agent",
	})
	if err != nil {
		t.Fatalf("expected scraper setup, got %v", err)
	}

	report, err := scraper.ScrapeAll(context.Background(), []domain.Target{
		{URL: server.URL + "/page-1"},
		{URL: server.URL + "/page-2"},
	})
	if err != nil {
		t.Fatalf("expected scrape to succeed, got %v", err)
	}

	if report.Completed != 2 || report.Failed != 0 {
		t.Fatalf("unexpected report counts: %#v", report)
	}
	if report.Results[0].Title != "Page One" {
		t.Fatalf("expected first title Page One, got %s", report.Results[0].Title)
	}
	if report.Results[1].Links != 2 {
		t.Fatalf("expected second page to have 2 links, got %d", report.Results[1].Links)
	}
	if len(report.Results[0].Keywords) == 0 {
		t.Fatalf("expected keywords to be extracted")
	}
}

func TestScrapeAllHandlesFailure(t *testing.T) {
	server := httptest.NewServer(http.HandlerFunc(func(writer http.ResponseWriter, request *http.Request) {
		writer.WriteHeader(http.StatusInternalServerError)
	}))
	defer server.Close()

	scraper, err := NewScraperService(domain.ScraperOptions{
		Concurrency: 1,
		Timeout:     time.Second,
		MaxRetries:  1,
		TopKeywords: 3,
		UserAgent:   "test-agent",
	})
	if err != nil {
		t.Fatalf("expected scraper setup, got %v", err)
	}

	report, err := scraper.ScrapeAll(context.Background(), []domain.Target{{URL: server.URL}})
	if err != nil {
		t.Fatalf("expected scrape report even on failure, got %v", err)
	}
	if report.Failed != 1 {
		t.Fatalf("expected one failed target, got %#v", report)
	}
	if report.Results[0].Retries != 1 {
		t.Fatalf("expected one retry, got %d", report.Results[0].Retries)
	}
}
