package domain

type FileComparison struct {
	LeftPath       string
	RightPath      string
	SharedWords    []WordCount
	UniqueToLeft   []WordCount
	UniqueToRight  []WordCount
	LineDelta      int
	WordDelta      int
	CharacterDelta int
}
