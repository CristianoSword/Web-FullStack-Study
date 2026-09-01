package ui

import (
	"strings"
	"testing"
)

func TestREPLTranscript(t *testing.T) {
	input := strings.NewReader("add 2 8\nhistory\nstats\nexit\n")
	output := &strings.Builder{}

	repl := NewREPL(input, output)
	if err := repl.Run(); err != nil {
		t.Fatalf("unexpected repl error: %v", err)
	}

	transcript := output.String()
	for _, expected := range []string{
		"Go Syntax CLI Calculator",
		"Result: 10.0000",
		"1. add [2 8] = 10.0000",
		"Commands: 3 | Calculations: 1",
		"Bye.",
	} {
		if !strings.Contains(transcript, expected) {
			t.Fatalf("expected transcript to contain %q, got %q", expected, transcript)
		}
	}
}
