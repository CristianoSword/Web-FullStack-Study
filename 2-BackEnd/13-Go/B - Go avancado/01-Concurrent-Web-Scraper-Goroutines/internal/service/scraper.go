package service

import (
	"bufio"
	"context"
	"fmt"
	"io"
	"net/http"
	"os"
	"slices"
	"strings"
	"sync"
	"time"
	"unicode"

	"golang.org/x/net/html"

	"github.com/CristianoSword/web-fullstack-study/2-backend/13-go/01-concurrent-web-scraper-goroutines/internal/domain"
)

type ScraperService struct {
	client  *http.Client
	options domain.ScraperOptions
}

type scrapeJob struct {
	index  int
	target domain.Target
}

type scrapeOutcome struct {
	index  int
	result domain.ScrapeResult
}

func NewScraperService(options domain.ScraperOptions) (*ScraperService, error) {
	if options.Concurrency <= 0 {
		return nil, fmt.Errorf("concurrency must be greater than zero")
	}
	if options.Timeout <= 0 {
		return nil, fmt.Errorf("timeout must be greater than zero")
	}
	if options.MaxRetries < 0 {
		return nil, fmt.Errorf("max retries must be non-negative")
	}
	if options.TopKeywords <= 0 {
		options.TopKeywords = 5
	}
	if strings.TrimSpace(options.UserAgent) == "" {
		options.UserAgent = "GoConcurrentScraper/1.0"
	}

	return &ScraperService{
		client: &http.Client{
			Timeout: options.Timeout,
		},
		options: options,
	}, nil
}

func LoadTargets(path string) ([]domain.Target, error) {
	file, err := os.Open(path)
	if err != nil {
		return nil, fmt.Errorf("open targets file: %w", err)
	}
	defer file.Close()

	targets := make([]domain.Target, 0)
	scanner := bufio.NewScanner(file)
	lineNumber := 0
	for scanner.Scan() {
		lineNumber++
		line := strings.TrimSpace(scanner.Text())
		if line == "" || strings.HasPrefix(line, "#") {
			continue
		}
		targets = append(targets, domain.Target{
			URL:    line,
			Source: fmt.Sprintf("%s:%d", path, lineNumber),
		})
	}
	if err := scanner.Err(); err != nil {
		return nil, fmt.Errorf("scan targets file: %w", err)
	}
	if len(targets) == 0 {
		return nil, fmt.Errorf("targets file %s did not contain usable urls", path)
	}
	return targets, nil
}

func (s *ScraperService) ScrapeAll(ctx context.Context, targets []domain.Target) (domain.ScrapeReport, error) {
	if len(targets) == 0 {
		return domain.ScrapeReport{}, fmt.Errorf("at least one target is required")
	}

	startedAt := time.Now()
	jobs := make(chan scrapeJob)
	outcomes := make(chan scrapeOutcome)
	var workers sync.WaitGroup

	for worker := 0; worker < s.options.Concurrency; worker++ {
		workers.Add(1)
		go func() {
			defer workers.Done()
			for job := range jobs {
				select {
				case <-ctx.Done():
					return
				default:
				}
				outcomes <- scrapeOutcome{
					index:  job.index,
					result: s.scrapeWithRetries(ctx, job.target),
				}
			}
		}()
	}

	go func() {
		for index, target := range targets {
			jobs <- scrapeJob{index: index, target: target}
		}
		close(jobs)
		workers.Wait()
		close(outcomes)
	}()

	results := make([]domain.ScrapeResult, len(targets))
	received := 0
	for outcome := range outcomes {
		results[outcome.index] = outcome.result
		received++
	}
	if received != len(targets) && ctx.Err() != nil {
		return domain.ScrapeReport{}, ctx.Err()
	}

	report := domain.ScrapeReport{
		TotalTargets:  len(targets),
		TotalDuration: time.Since(startedAt),
		Results:       results,
	}
	var latencyTotal time.Duration
	for _, result := range results {
		if result.Error != "" {
			report.Failed++
			continue
		}
		report.Completed++
		latencyTotal += result.Duration
	}
	if report.Completed > 0 {
		report.AverageLatency = latencyTotal / time.Duration(report.Completed)
	}
	return report, nil
}

func (s *ScraperService) scrapeWithRetries(ctx context.Context, target domain.Target) domain.ScrapeResult {
	var lastResult domain.ScrapeResult
	for attempt := 0; attempt <= s.options.MaxRetries; attempt++ {
		result := s.scrapeTarget(ctx, target)
		result.Retries = attempt
		if result.Error == "" {
			return result
		}
		lastResult = result
	}
	return lastResult
}

func (s *ScraperService) scrapeTarget(ctx context.Context, target domain.Target) domain.ScrapeResult {
	startedAt := time.Now()
	result := domain.ScrapeResult{
		URL:       target.URL,
		ScrapedAt: startedAt.UTC(),
	}

	request, err := http.NewRequestWithContext(ctx, http.MethodGet, target.URL, nil)
	if err != nil {
		result.Error = fmt.Sprintf("build request: %v", err)
		return finalizeResult(result, startedAt)
	}
	request.Header.Set("User-Agent", s.options.UserAgent)
	for key, value := range target.Headers {
		request.Header.Set(key, value)
	}

	response, err := s.client.Do(request)
	if err != nil {
		result.Error = fmt.Sprintf("perform request: %v", err)
		return finalizeResult(result, startedAt)
	}
	defer response.Body.Close()

	result.StatusCode = response.StatusCode
	if response.StatusCode >= http.StatusBadRequest {
		result.Error = fmt.Sprintf("unexpected status code: %d", response.StatusCode)
		return finalizeResult(result, startedAt)
	}

	body, err := io.ReadAll(io.LimitReader(response.Body, 2*1024*1024))
	if err != nil {
		result.Error = fmt.Sprintf("read response body: %v", err)
		return finalizeResult(result, startedAt)
	}

	title, headings, links, words, keywords, err := parseHTML(body, s.options.TopKeywords)
	if err != nil {
		result.Error = fmt.Sprintf("parse html: %v", err)
		return finalizeResult(result, startedAt)
	}

	result.Title = title
	result.Headings = headings
	result.Links = links
	result.Words = words
	result.Keywords = keywords
	return finalizeResult(result, startedAt)
}

func finalizeResult(result domain.ScrapeResult, startedAt time.Time) domain.ScrapeResult {
	result.Duration = time.Since(startedAt)
	return result
}

func parseHTML(body []byte, topKeywords int) (string, []string, int, int, []domain.WordCount, error) {
	document, err := html.Parse(strings.NewReader(string(body)))
	if err != nil {
		return "", nil, 0, 0, nil, err
	}

	var (
		title     string
		headings  []string
		links     int
		wordCount int
		keywords  = map[string]int{}
	)

	var walk func(*html.Node)
	walk = func(node *html.Node) {
		if node.Type == html.ElementNode {
			switch node.Data {
			case "title":
				if title == "" {
					title = strings.TrimSpace(extractText(node))
				}
			case "a":
				links++
			case "h1", "h2", "h3":
				text := strings.TrimSpace(extractText(node))
				if text != "" {
					headings = append(headings, text)
				}
			}
		}
		if node.Type == html.TextNode {
			for _, token := range tokenize(node.Data) {
				wordCount++
				if len(token) >= 4 {
					keywords[token]++
				}
			}
		}
		for child := node.FirstChild; child != nil; child = child.NextSibling {
			walk(child)
		}
	}
	walk(document)

	if title == "" {
		title = "Untitled"
	}
	return title, headings, links, wordCount, topWordCounts(keywords, topKeywords), nil
}

func extractText(node *html.Node) string {
	var builder strings.Builder
	var walk func(*html.Node)
	walk = func(current *html.Node) {
		if current.Type == html.TextNode {
			builder.WriteString(current.Data)
			builder.WriteString(" ")
		}
		for child := current.FirstChild; child != nil; child = child.NextSibling {
			walk(child)
		}
	}
	walk(node)
	return builder.String()
}

func tokenize(text string) []string {
	return strings.FieldsFunc(strings.ToLower(text), func(r rune) bool {
		return !unicode.IsLetter(r) && !unicode.IsNumber(r)
	})
}

func topWordCounts(frequency map[string]int, limit int) []domain.WordCount {
	words := make([]domain.WordCount, 0, len(frequency))
	for word, count := range frequency {
		words = append(words, domain.WordCount{Word: word, Count: count})
	}
	slices.SortFunc(words, func(left, right domain.WordCount) int {
		if left.Count == right.Count {
			return strings.Compare(left.Word, right.Word)
		}
		if left.Count > right.Count {
			return -1
		}
		return 1
	})
	if len(words) > limit {
		words = words[:limit]
	}
	return words
}
