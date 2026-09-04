package service

import (
	"os"
	"path/filepath"
	"strings"
	"testing"

	"github.com/CristianoSword/web-fullstack-study/2-backend/13-go/04-file-reader-writer/internal/domain"
)

func TestAnalyzeFile(t *testing.T) {
	baseDir := t.TempDir()
	path := writeTestFile(t, baseDir, "inventory.txt", strings.Join([]string{
		"keyboard mechanical wireless",
		"mouse optical wireless",
		"dock usb-c office",
	}, "\n"))

	service := newTestService(t, baseDir)
	report, err := service.AnalyzeFile(filepath.Base(path))
	if err != nil {
		t.Fatalf("expected analyze file to succeed, got %v", err)
	}

	if report.Lines != 3 || report.Words != 10 || report.LongestLine == 0 {
		t.Fatalf("unexpected report: %#v", report)
	}
	if len(report.TopWords) == 0 || report.TopWords[0].Word != "wireless" {
		t.Fatalf("expected top words to include wireless, got %#v", report.TopWords)
	}
}

func TestSearchInFile(t *testing.T) {
	baseDir := t.TempDir()
	writeTestFile(t, baseDir, "notes.txt", strings.Join([]string{
		"Go makes concurrent file processing approachable.",
		"This sample file is used for reader and search tests.",
	}, "\n"))

	service := newTestService(t, baseDir)
	report, err := service.SearchInFile(domain.SearchRequest{
		Path: "notes.txt",
		Term: "search",
	})
	if err != nil {
		t.Fatalf("expected search to succeed, got %v", err)
	}
	if len(report.SearchResults) != 1 || report.SearchResults[0].LineNumber != 2 {
		t.Fatalf("unexpected search matches: %#v", report.SearchResults)
	}
}

func TestCompareFiles(t *testing.T) {
	baseDir := t.TempDir()
	writeTestFile(t, baseDir, "left.txt", "go readers compare words")
	writeTestFile(t, baseDir, "right.txt", "go writers compare text")

	service := newTestService(t, baseDir)
	comparison, err := service.CompareFiles("left.txt", "right.txt")
	if err != nil {
		t.Fatalf("expected compare to succeed, got %v", err)
	}

	if len(comparison.SharedWords) == 0 {
		t.Fatalf("expected shared words in comparison")
	}
	if comparison.WordDelta != 0 {
		t.Fatalf("expected equal word counts, got delta %d", comparison.WordDelta)
	}
}

func TestValidation(t *testing.T) {
	baseDir := t.TempDir()
	writeTestFile(t, baseDir, "notes.txt", "safe text")
	service := newTestService(t, baseDir)

	if _, err := service.AnalyzeFile("../notes.txt"); err == nil {
		t.Fatalf("expected path traversal validation to fail")
	}
	if _, err := service.SearchInFile(domain.SearchRequest{Path: "notes.txt", Term: ""}); err == nil {
		t.Fatalf("expected empty search term to fail")
	}
	if _, err := NewFileService(domain.ReaderOptions{}); err == nil {
		t.Fatalf("expected invalid reader options to fail")
	}
}

func newTestService(t *testing.T, baseDir string) *FileService {
	t.Helper()

	service, err := NewFileService(domain.ReaderOptions{
		BaseDirectory:    baseDir,
		MaxFileSizeBytes: 1024 * 1024,
		TopWordLimit:     5,
	})
	if err != nil {
		t.Fatalf("expected file service setup, got %v", err)
	}
	return service
}

func writeTestFile(t *testing.T, baseDir string, name string, content string) string {
	t.Helper()

	path := filepath.Join(baseDir, name)
	if err := os.WriteFile(path, []byte(content), 0o644); err != nil {
		t.Fatalf("write test file: %v", err)
	}
	return path
}
