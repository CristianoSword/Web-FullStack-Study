package ui

import (
	"bufio"
	"fmt"
	"io"
	"strings"

	"github.com/CristianoSword/web-fullstack-study/2-backend/13-go/04-file-reader-writer/internal/domain"
	"github.com/CristianoSword/web-fullstack-study/2-backend/13-go/04-file-reader-writer/internal/service"
)

type App struct {
	in      io.Reader
	out     io.Writer
	service *service.FileService
}

func NewApp(in io.Reader, out io.Writer, service *service.FileService) *App {
	return &App{in: in, out: out, service: service}
}

func (a *App) Run() error {
	scanner := bufio.NewScanner(a.in)
	a.printWelcome()

	for {
		fmt.Fprint(a.out, "filetool> ")
		if !scanner.Scan() {
			fmt.Fprintln(a.out, "Session closed.")
			return scanner.Err()
		}

		line := strings.TrimSpace(scanner.Text())
		if line == "" {
			continue
		}

		shouldExit, err := a.handle(line)
		if err != nil {
			fmt.Fprintf(a.out, "Error: %v\n", err)
			continue
		}
		if shouldExit {
			fmt.Fprintln(a.out, "Bye.")
			return nil
		}
	}
}

func (a *App) handle(line string) (bool, error) {
	tokens := strings.Fields(line)
	command := strings.ToLower(tokens[0])

	switch command {
	case "help":
		a.printHelp()
	case "inspect":
		if len(tokens) != 2 {
			return false, fmt.Errorf("usage: inspect <file>")
		}
		report, err := a.service.AnalyzeFile(tokens[1])
		if err != nil {
			return false, err
		}
		a.printReport(report)
	case "search":
		if len(tokens) < 3 {
			return false, fmt.Errorf("usage: search <file> <term>")
		}
		report, err := a.service.SearchInFile(domain.SearchRequest{
			Path: tokens[1],
			Term: strings.Join(tokens[2:], " "),
		})
		if err != nil {
			return false, err
		}
		a.printSearch(report)
	case "compare":
		if len(tokens) != 3 {
			return false, fmt.Errorf("usage: compare <left-file> <right-file>")
		}
		comparison, err := a.service.CompareFiles(tokens[1], tokens[2])
		if err != nil {
			return false, err
		}
		a.printComparison(comparison)
	case "exit", "quit":
		return true, nil
	default:
		return false, fmt.Errorf("unknown command: %s", command)
	}

	return false, nil
}

func (a *App) printWelcome() {
	fmt.Fprintln(a.out, "File Reader Writer")
	fmt.Fprintln(a.out, "Inspect, search and compare text files inside the samples directory.")
}

func (a *App) printHelp() {
	fmt.Fprintln(a.out, "Commands:")
	fmt.Fprintln(a.out, "  inspect <file>")
	fmt.Fprintln(a.out, "  search <file> <term>")
	fmt.Fprintln(a.out, "  compare <left-file> <right-file>")
	fmt.Fprintln(a.out, "  help")
	fmt.Fprintln(a.out, "  exit")
}

func (a *App) printReport(report domain.FileReport) {
	fmt.Fprintf(
		a.out,
		"path=%s lines=%d words=%d chars=%d bytes=%d longest-line=%d bom=%t\n",
		report.Path,
		report.Lines,
		report.Words,
		report.Characters,
		report.Bytes,
		report.LongestLine,
		report.ContainsBOM,
	)
	for _, word := range report.TopWords {
		fmt.Fprintf(a.out, "top-word %s=%d\n", word.Word, word.Count)
	}
}

func (a *App) printSearch(report domain.FileReport) {
	a.printReport(report)
	if len(report.SearchResults) == 0 {
		fmt.Fprintln(a.out, "No search results.")
		return
	}
	for _, match := range report.SearchResults {
		fmt.Fprintf(a.out, "match line=%d text=%s\n", match.LineNumber, match.Content)
	}
}

func (a *App) printComparison(comparison domain.FileComparison) {
	fmt.Fprintf(
		a.out,
		"compare left=%s right=%s line-delta=%d word-delta=%d char-delta=%d\n",
		comparison.LeftPath,
		comparison.RightPath,
		comparison.LineDelta,
		comparison.WordDelta,
		comparison.CharacterDelta,
	)
	a.printWordCounts("shared", comparison.SharedWords)
	a.printWordCounts("left-only", comparison.UniqueToLeft)
	a.printWordCounts("right-only", comparison.UniqueToRight)
}

func (a *App) printWordCounts(label string, words []domain.WordCount) {
	if len(words) == 0 {
		fmt.Fprintf(a.out, "%s: none\n", label)
		return
	}
	for _, word := range words {
		fmt.Fprintf(a.out, "%s %s=%d\n", label, word.Word, word.Count)
	}
}
