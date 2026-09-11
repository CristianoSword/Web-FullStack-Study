package ui

import (
	"bytes"
	"context"
	"path/filepath"
	"strings"
	"testing"
)

func TestAppRunMockPublishAndConsume(t *testing.T) {
	filePath := filepath.Join("..", "..", "examples", "events.jsonl")

	var publishOutput bytes.Buffer
	publishApp := NewApp(&publishOutput)
	if err := publishApp.Run(context.Background(), []string{
		"-broker", "mock",
		"-mode", "publish",
		"-file", filePath,
	}); err != nil {
		t.Fatalf("expected mock publish to succeed, got %v", err)
	}
	if !strings.Contains(publishOutput.String(), "published event=evt-001 delivered=true") {
		t.Fatalf("unexpected publish output:\n%s", publishOutput.String())
	}

	var consumeOutput bytes.Buffer
	consumeApp := NewApp(&consumeOutput)
	if err := consumeApp.Run(context.Background(), []string{
		"-broker", "mock",
		"-mode", "consume",
		"-file", filePath,
	}); err != nil {
		t.Fatalf("expected mock consume to succeed, got %v", err)
	}
	if !strings.Contains(consumeOutput.String(), "consumed mock events successfully") {
		t.Fatalf("unexpected consume output:\n%s", consumeOutput.String())
	}
}
