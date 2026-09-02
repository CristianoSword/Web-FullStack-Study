package domain

type Borrowable interface {
	CanBorrow() bool
	AvailableCopies() int
}

type NotificationSender interface {
	SendBorrowReceipt(member Member, book Book, loan Loan) error
	SendReturnReceipt(member Member, book Book, loan Loan) error
}

type LibraryRepository interface {
	ListBooks() []Book
	ListMembers() []Member
	ListLoans() []Loan
	FindBook(id string) (*Book, bool)
	FindMember(id string) (*Member, bool)
	FindLoan(id string) (*Loan, bool)
	SearchBooks(term string) []Book
	CountOpenLoansForMember(memberID string) int
	CreateLoan(loan Loan) error
	UpdateLoan(loan Loan) error
	UpdateBook(book Book) error
}
