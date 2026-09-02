package repository

import (
	"strings"

	"github.com/CristianoSword/web-fullstack-study/2-backend/13-go/02-structs-interfaces-oop/internal/domain"
)

type MemoryRepository struct {
	books   map[string]domain.Book
	members map[string]domain.Member
	loans   map[string]domain.Loan
}

func NewMemoryRepository() *MemoryRepository {
	repo := &MemoryRepository{
		books:   make(map[string]domain.Book),
		members: make(map[string]domain.Member),
		loans:   make(map[string]domain.Loan),
	}
	repo.seed()
	return repo
}

func (r *MemoryRepository) seed() {
	r.books["bk-100"] = domain.Book{ID: "bk-100", ISBN: "9780132350884", Title: "Clean Code", Author: "Robert C. Martin", Genre: domain.GenreEngineering, TotalCopies: 3, LoanedCopies: 0}
	r.books["bk-101"] = domain.Book{ID: "bk-101", ISBN: "9780201616224", Title: "The Pragmatic Programmer", Author: "Andrew Hunt", Genre: domain.GenreProductivity, TotalCopies: 2, LoanedCopies: 0}
	r.books["bk-102"] = domain.Book{ID: "bk-102", ISBN: "9780321125217", Title: "Domain-Driven Design", Author: "Eric Evans", Genre: domain.GenreArchitecture, TotalCopies: 1, LoanedCopies: 0}

	r.members["mb-001"] = domain.Member{ID: "mb-001", Name: "Ana Silva", Email: "ana@example.com", Tier: domain.TierPremium, MaxConcurrent: 4, Active: true}
	r.members["mb-002"] = domain.Member{ID: "mb-002", Name: "Carlos Lima", Email: "carlos@example.com", Tier: domain.TierStandard, MaxConcurrent: 2, Active: true}
	r.members["mb-003"] = domain.Member{ID: "mb-003", Name: "Marina Costa", Email: "marina@example.com", Tier: domain.TierStandard, MaxConcurrent: 1, Active: false}
}

func (r *MemoryRepository) ListBooks() []domain.Book {
	books := make([]domain.Book, 0, len(r.books))
	for _, book := range r.books {
		books = append(books, book)
	}
	return books
}

func (r *MemoryRepository) ListMembers() []domain.Member {
	members := make([]domain.Member, 0, len(r.members))
	for _, member := range r.members {
		members = append(members, member)
	}
	return members
}

func (r *MemoryRepository) ListLoans() []domain.Loan {
	loans := make([]domain.Loan, 0, len(r.loans))
	for _, loan := range r.loans {
		loans = append(loans, loan)
	}
	return loans
}

func (r *MemoryRepository) FindBook(id string) (*domain.Book, bool) {
	book, ok := r.books[id]
	if !ok {
		return nil, false
	}
	copyBook := book
	return &copyBook, true
}

func (r *MemoryRepository) FindMember(id string) (*domain.Member, bool) {
	member, ok := r.members[id]
	if !ok {
		return nil, false
	}
	copyMember := member
	return &copyMember, true
}

func (r *MemoryRepository) FindLoan(id string) (*domain.Loan, bool) {
	loan, ok := r.loans[id]
	if !ok {
		return nil, false
	}
	copyLoan := loan
	return &copyLoan, true
}

func (r *MemoryRepository) SearchBooks(term string) []domain.Book {
	normalized := strings.ToLower(strings.TrimSpace(term))
	if normalized == "" {
		return r.ListBooks()
	}
	matches := make([]domain.Book, 0)
	for _, book := range r.books {
		searchable := strings.ToLower(book.Title + " " + book.Author + " " + string(book.Genre))
		if strings.Contains(searchable, normalized) {
			matches = append(matches, book)
		}
	}
	return matches
}

func (r *MemoryRepository) CountOpenLoansForMember(memberID string) int {
	count := 0
	for _, loan := range r.loans {
		if loan.MemberID == memberID && loan.Status == domain.LoanStatusOpen {
			count++
		}
	}
	return count
}

func (r *MemoryRepository) CreateLoan(loan domain.Loan) error {
	r.loans[loan.ID] = loan
	return nil
}

func (r *MemoryRepository) UpdateLoan(loan domain.Loan) error {
	r.loans[loan.ID] = loan
	return nil
}

func (r *MemoryRepository) UpdateBook(book domain.Book) error {
	r.books[book.ID] = book
	return nil
}
