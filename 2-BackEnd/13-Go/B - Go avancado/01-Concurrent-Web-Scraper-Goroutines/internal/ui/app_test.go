package ui

import (
	"bytes"
	"context"
	"os"
	"path/filepath"
	"strings"
	"testing"
	"time"

	"net/http"
	"net/http/httptest"
)

func TestAppRun(t *testing.T) {
	server := httptest.NewServer(http.HandlerFunc(func(writer http.ResponseWriter, request *http.Request) {
		_, _ = writer.Write([]byte(`<html><head><title>CLI Test</title></head><body><h1>Headline</h1><a href="/x">X</a><p>goroutines channels workers workers</p></body></html>`))
	}))
	defer server.Close()

	tempDir := t.TempDir()
	targetsPath := filepath.Join(tempDir, "targets.txt")
	if err := os.WriteFile(targetsPath, []byte(server.URL), 0o644); err != nil {
		t.Fatalf("write targets file: %v", err)
	}

	var output bytes.Buffer
	app := NewApp(&output)
	err := app.Run(context.Background(), []string{
		"-targets", targetsPath,
		"-concurrency", "1",
		"-timeout", (2 * time.Second).String(),
		"-retries", "0",
		"-top-keywords", "3",
	})
	if err != nil {
		t.Fatalf("expected app run to succeed, got %v", err)
	}

	transcript := output.String()
	expected := []string{
		"targets=1 completed=1 failed=0",
		"[OK]",
		`title="CLI Test"`,
		"headings=Headline",
		"keywords=workers=2",
	}
	for _, snippet := range expected {
		if !strings.Contains(transcript, snippet) {
			t.Fatalf("expected transcript to contain %q\n%s", snippet, transcript)
		}
	}
}
