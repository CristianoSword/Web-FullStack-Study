package domain

import "time"

type LoanStatus string

const (
	LoanStatusOpen     LoanStatus = "open"
	LoanStatusReturned LoanStatus = "returned"
)

type Loan struct {
	ID         string
	BookID     string
	MemberID   string
	BorrowedAt time.Time
	DueAt      time.Time
	ReturnedAt *time.Time
	Status     LoanStatus
}
