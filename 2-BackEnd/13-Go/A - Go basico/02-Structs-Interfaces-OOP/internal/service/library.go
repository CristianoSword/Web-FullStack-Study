package service

import (
	"fmt"
	"time"

	"github.com/CristianoSword/web-fullstack-study/2-backend/13-go/02-structs-interfaces-oop/internal/domain"
)

type LibraryService struct {
	repository domain.LibraryRepository
	notifier   domain.NotificationSender
	nextLoanID int
}

func NewLibraryService(repository domain.LibraryRepository, notifier domain.NotificationSender) *LibraryService {
	return &LibraryService{
		repository: repository,
		notifier:   notifier,
		nextLoanID: 1,
	}
}

func (s *LibraryService) ListBooks() []domain.Book {
	return s.repository.ListBooks()
}

func (s *LibraryService) ListMembers() []domain.Member {
	return s.repository.ListMembers()
}

func (s *LibraryService) ListLoans() []domain.Loan {
	return s.repository.ListLoans()
}

func (s *LibraryService) SearchBooks(term string) []domain.Book {
	return s.repository.SearchBooks(term)
}

func (s *LibraryService) BorrowBook(bookID string, memberID string) (domain.Loan, error) {
	book, ok := s.repository.FindBook(bookID)
	if !ok {
		return domain.Loan{}, fmt.Errorf("book not found: %s", bookID)
	}
	member, ok := s.repository.FindMember(memberID)
	if !ok {
		return domain.Loan{}, fmt.Errorf("member not found: %s", memberID)
	}
	if !book.CanBorrow() {
		return domain.Loan{}, fmt.Errorf("book %s is currently unavailable", book.Title)
	}
	openLoans := s.repository.CountOpenLoansForMember(member.ID)
	if !member.CanBorrow(openLoans) {
		return domain.Loan{}, fmt.Errorf("member %s cannot borrow more books", member.Name)
	}

	now := time.Now().UTC()
	loan := domain.Loan{
		ID:         fmt.Sprintf("loan-%03d", s.nextLoanID),
		BookID:     book.ID,
		MemberID:   member.ID,
		BorrowedAt: now,
		DueAt:      now.AddDate(0, 0, 14),
		Status:     domain.LoanStatusOpen,
	}
	s.nextLoanID++

	book.LoanedCopies++
	if err := s.repository.UpdateBook(*book); err != nil {
		return domain.Loan{}, err
	}
	if err := s.repository.CreateLoan(loan); err != nil {
		return domain.Loan{}, err
	}
	if err := s.notifier.SendBorrowReceipt(*member, *book, loan); err != nil {
		return domain.Loan{}, err
	}
	return loan, nil
}

func (s *LibraryService) ReturnBook(loanID string) (domain.Loan, error) {
	loan, ok := s.repository.FindLoan(loanID)
	if !ok {
		return domain.Loan{}, fmt.Errorf("loan not found: %s", loanID)
	}
	if loan.Status == domain.LoanStatusReturned {
		return domain.Loan{}, fmt.Errorf("loan %s was already returned", loan.ID)
	}
	book, ok := s.repository.FindBook(loan.BookID)
	if !ok {
		return domain.Loan{}, fmt.Errorf("book not found: %s", loan.BookID)
	}
	member, ok := s.repository.FindMember(loan.MemberID)
	if !ok {
		return domain.Loan{}, fmt.Errorf("member not found: %s", loan.MemberID)
	}

	now := time.Now().UTC()
	loan.Status = domain.LoanStatusReturned
	loan.ReturnedAt = &now
	if book.LoanedCopies > 0 {
		book.LoanedCopies--
	}

	if err := s.repository.UpdateLoan(*loan); err != nil {
		return domain.Loan{}, err
	}
	if err := s.repository.UpdateBook(*book); err != nil {
		return domain.Loan{}, err
	}
	if err := s.notifier.SendReturnReceipt(*member, *book, *loan); err != nil {
		return domain.Loan{}, err
	}
	return *loan, nil
}
