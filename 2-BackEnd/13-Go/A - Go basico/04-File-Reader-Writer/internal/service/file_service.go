package service

import (
	"bufio"
	"fmt"
	"os"
	"path/filepath"
	"slices"
	"strings"
	"unicode"
	"unicode/utf8"

	"github.com/CristianoSword/web-fullstack-study/2-backend/13-go/04-file-reader-writer/internal/domain"
)

type FileService struct {
	options domain.ReaderOptions
}

func NewFileService(options domain.ReaderOptions) (*FileService, error) {
	if strings.TrimSpace(options.BaseDirectory) == "" {
		return nil, fmt.Errorf("base directory is required")
	}
	if options.MaxFileSizeBytes <= 0 {
		return nil, fmt.Errorf("max file size must be positive")
	}
	if options.TopWordLimit <= 0 {
		options.TopWordLimit = 5
	}
	return &FileService{options: options}, nil
}

func (s *FileService) AnalyzeFile(path string) (domain.FileReport, error) {
	resolvedPath, info, err := s.validatePath(path)
	if err != nil {
		return domain.FileReport{}, err
	}

	file, err := os.Open(resolvedPath)
	if err != nil {
		return domain.FileReport{}, fmt.Errorf("open file: %w", err)
	}
	defer file.Close()

	wordFrequency := map[string]int{}
	report := domain.FileReport{
		Path:  resolvedPath,
		Bytes: int(info.Size()),
	}

	scanner := bufio.NewScanner(file)
	firstLine := true
	for scanner.Scan() {
		line := scanner.Text()
		if firstLine {
			report.ContainsBOM = strings.HasPrefix(line, "\ufeff")
			line = strings.TrimPrefix(line, "\ufeff")
			firstLine = false
		}
		report.Lines++
		report.Characters += utf8.RuneCountInString(line)
		if len(line) > report.LongestLine {
			report.LongestLine = len(line)
		}

		words := tokenize(line)
		report.Words += len(words)
		for _, word := range words {
			wordFrequency[word]++
		}
	}
	if err := scanner.Err(); err != nil {
		return domain.FileReport{}, fmt.Errorf("scan file: %w", err)
	}

	report.TopWords = topWords(wordFrequency, s.options.TopWordLimit)
	return report, nil
}

func (s *FileService) SearchInFile(request domain.SearchRequest) (domain.FileReport, error) {
	report, err := s.AnalyzeFile(request.Path)
	if err != nil {
		return domain.FileReport{}, err
	}
	term := strings.ToLower(strings.TrimSpace(request.Term))
	if term == "" {
		return domain.FileReport{}, fmt.Errorf("search term is required")
	}

	file, err := os.Open(report.Path)
	if err != nil {
		return domain.FileReport{}, fmt.Errorf("open file: %w", err)
	}
	defer file.Close()

	scanner := bufio.NewScanner(file)
	lineNumber := 0
	for scanner.Scan() {
		lineNumber++
		line := strings.TrimPrefix(scanner.Text(), "\ufeff")
		if strings.Contains(strings.ToLower(line), term) {
			report.SearchResults = append(report.SearchResults, domain.SearchMatch{
				LineNumber: lineNumber,
				Content:    line,
			})
		}
	}
	if err := scanner.Err(); err != nil {
		return domain.FileReport{}, fmt.Errorf("scan file: %w", err)
	}
	return report, nil
}

func (s *FileService) CompareFiles(leftPath string, rightPath string) (domain.FileComparison, error) {
	left, err := s.AnalyzeFile(leftPath)
	if err != nil {
		return domain.FileComparison{}, err
	}
	right, err := s.AnalyzeFile(rightPath)
	if err != nil {
		return domain.FileComparison{}, err
	}

	leftWords, err := s.wordFrequency(left.Path)
	if err != nil {
		return domain.FileComparison{}, err
	}
	rightWords, err := s.wordFrequency(right.Path)
	if err != nil {
		return domain.FileComparison{}, err
	}

	comparison := domain.FileComparison{
		LeftPath:       left.Path,
		RightPath:      right.Path,
		LineDelta:      left.Lines - right.Lines,
		WordDelta:      left.Words - right.Words,
		CharacterDelta: left.Characters - right.Characters,
	}

	for word, count := range leftWords {
		if rightCount, ok := rightWords[word]; ok {
			comparison.SharedWords = append(comparison.SharedWords, domain.WordCount{
				Word:  word,
				Count: min(count, rightCount),
			})
		} else {
			comparison.UniqueToLeft = append(comparison.UniqueToLeft, domain.WordCount{
				Word:  word,
				Count: count,
			})
		}
	}
	for word, count := range rightWords {
		if _, ok := leftWords[word]; !ok {
			comparison.UniqueToRight = append(comparison.UniqueToRight, domain.WordCount{
				Word:  word,
				Count: count,
			})
		}
	}

	sortWordCounts(comparison.SharedWords)
	sortWordCounts(comparison.UniqueToLeft)
	sortWordCounts(comparison.UniqueToRight)
	return comparison, nil
}

func (s *FileService) validatePath(path string) (string, os.FileInfo, error) {
	cleanPath := strings.TrimSpace(path)
	if cleanPath == "" {
		return "", nil, fmt.Errorf("path is required")
	}

	baseAbs, err := filepath.Abs(s.options.BaseDirectory)
	if err != nil {
		return "", nil, fmt.Errorf("resolve base directory: %w", err)
	}
	targetAbs, err := filepath.Abs(filepath.Join(baseAbs, cleanPath))
	if err != nil {
		return "", nil, fmt.Errorf("resolve file path: %w", err)
	}
	relativePath, err := filepath.Rel(baseAbs, targetAbs)
	if err != nil {
		return "", nil, fmt.Errorf("resolve relative path: %w", err)
	}
	if strings.HasPrefix(relativePath, "..") {
		return "", nil, fmt.Errorf("path escapes base directory: %s", path)
	}

	info, err := os.Stat(targetAbs)
	if err != nil {
		return "", nil, fmt.Errorf("stat file: %w", err)
	}
	if info.IsDir() {
		return "", nil, fmt.Errorf("path points to a directory: %s", path)
	}
	if info.Size() > s.options.MaxFileSizeBytes {
		return "", nil, fmt.Errorf("file exceeds size limit of %d bytes", s.options.MaxFileSizeBytes)
	}
	return targetAbs, info, nil
}

func (s *FileService) wordFrequency(path string) (map[string]int, error) {
	file, err := os.Open(path)
	if err != nil {
		return nil, fmt.Errorf("open file: %w", err)
	}
	defer file.Close()

	frequency := map[string]int{}
	scanner := bufio.NewScanner(file)
	for scanner.Scan() {
		for _, word := range tokenize(strings.TrimPrefix(scanner.Text(), "\ufeff")) {
			frequency[word]++
		}
	}
	if err := scanner.Err(); err != nil {
		return nil, fmt.Errorf("scan file: %w", err)
	}
	return frequency, nil
}

func tokenize(line string) []string {
	return strings.FieldsFunc(strings.ToLower(line), func(r rune) bool {
		return !unicode.IsLetter(r) && !unicode.IsNumber(r)
	})
}

func topWords(frequency map[string]int, limit int) []domain.WordCount {
	words := make([]domain.WordCount, 0, len(frequency))
	for word, count := range frequency {
		words = append(words, domain.WordCount{Word: word, Count: count})
	}
	sortWordCounts(words)
	if len(words) > limit {
		words = words[:limit]
	}
	return words
}

func sortWordCounts(words []domain.WordCount) {
	slices.SortFunc(words, func(left, right domain.WordCount) int {
		if left.Count == right.Count {
			return strings.Compare(left.Word, right.Word)
		}
		if left.Count > right.Count {
			return -1
		}
		return 1
	})
}
