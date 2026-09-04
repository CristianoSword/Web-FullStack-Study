package domain

type FileReport struct {
	Path          string
	Lines         int
	Words         int
	Bytes         int
	Characters    int
	LongestLine   int
	TopWords      []WordCount
	ContainsBOM   bool
	SearchResults []SearchMatch
}

type WordCount struct {
	Word  string
	Count int
}

type SearchMatch struct {
	LineNumber int
	Content    string
}
