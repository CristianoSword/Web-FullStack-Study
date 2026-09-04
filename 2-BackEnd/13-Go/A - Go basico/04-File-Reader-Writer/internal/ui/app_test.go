package ui

import (
	"bytes"
	"path/filepath"
	"strings"
	"testing"

	"github.com/CristianoSword/web-fullstack-study/2-backend/13-go/04-file-reader-writer/internal/domain"
	"github.com/CristianoSword/web-fullstack-study/2-backend/13-go/04-file-reader-writer/internal/service"
)

func TestAppRun(t *testing.T) {
	baseDir := filepath.Join("..", "..", "samples")
	fileService, err := service.NewFileService(domain.ReaderOptions{
		BaseDirectory:    baseDir,
		MaxFileSizeBytes: 1024 * 1024,
		TopWordLimit:     5,
	})
	if err != nil {
		t.Fatalf("expected file service setup, got %v", err)
	}

	input := strings.Join([]string{
		"inspect inventory.txt",
		"search notes.txt reader",
		"compare inventory.txt notes.txt",
		"exit",
	}, "\n")

	var output bytes.Buffer
	app := NewApp(strings.NewReader(input), &output, fileService)

	if err := app.Run(); err != nil {
		t.Fatalf("expected app run to succeed, got %v", err)
	}

	transcript := output.String()
	expectedSnippets := []string{
		"File Reader Writer",
		"top-word wireless=2",
		"match line=2 text=This sample file is used for reader and search tests.",
		"compare left=",
		"shared",
		"Bye.",
	}
	for _, snippet := range expectedSnippets {
		if !strings.Contains(transcript, snippet) {
			t.Fatalf("expected transcript to contain %q\n%s", snippet, transcript)
		}
	}
}
