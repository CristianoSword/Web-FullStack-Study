package service

import (
	"fmt"
	"strings"
	"sync"

	"github.com/CristianoSword/web-fullstack-study/2-backend/13-go/05-go-http-server-basic/internal/domain"
)

type CatalogService struct {
	mu     sync.RWMutex
	books  []domain.Book
	byID   map[string]domain.Book
	nextID int
}

func NewCatalogService(seed []domain.Book) (*CatalogService, error) {
	service := &CatalogService{
		books:  make([]domain.Book, 0, len(seed)),
		byID:   make(map[string]domain.Book, len(seed)),
		nextID: 1,
	}
	for _, book := range seed {
		if _, err := service.Create(domain.CreateBookRequest{
			Title:       book.Title,
			Author:      book.Author,
			Category:    book.Category,
			Description: book.Description,
		}); err != nil {
			return nil, err
		}
	}
	return service, nil
}

func (s *CatalogService) List() []domain.Book {
	s.mu.RLock()
	defer s.mu.RUnlock()

	books := make([]domain.Book, 0, len(s.books))
	for _, book := range s.books {
		books = append(books, book)
	}
	return books
}

func (s *CatalogService) Find(id string) (domain.Book, bool) {
	s.mu.RLock()
	defer s.mu.RUnlock()

	book, ok := s.byID[id]
	return book, ok
}

func (s *CatalogService) Create(request domain.CreateBookRequest) (domain.Book, error) {
	normalized, err := normalizeCreateRequest(request)
	if err != nil {
		return domain.Book{}, err
	}

	s.mu.Lock()
	defer s.mu.Unlock()

	book := domain.Book{
		ID:          fmt.Sprintf("book-%03d", s.nextID),
		Title:       normalized.Title,
		Author:      normalized.Author,
		Category:    normalized.Category,
		Description: normalized.Description,
	}
	s.nextID++

	s.books = append(s.books, book)
	s.byID[book.ID] = book
	return book, nil
}

func normalizeCreateRequest(request domain.CreateBookRequest) (domain.CreateBookRequest, error) {
	request.Title = strings.TrimSpace(request.Title)
	request.Author = strings.TrimSpace(request.Author)
	request.Category = strings.TrimSpace(request.Category)
	request.Description = strings.TrimSpace(request.Description)

	if request.Title == "" {
		return domain.CreateBookRequest{}, fmt.Errorf("title is required")
	}
	if request.Author == "" {
		return domain.CreateBookRequest{}, fmt.Errorf("author is required")
	}
	if request.Category == "" {
		return domain.CreateBookRequest{}, fmt.Errorf("category is required")
	}
	if request.Description == "" {
		return domain.CreateBookRequest{}, fmt.Errorf("description is required")
	}
	return request, nil
}
