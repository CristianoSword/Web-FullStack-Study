package domain

type ReaderOptions struct {
	BaseDirectory    string
	MaxFileSizeBytes int64
	TopWordLimit     int
}

type SearchRequest struct {
	Path string
	Term string
}
