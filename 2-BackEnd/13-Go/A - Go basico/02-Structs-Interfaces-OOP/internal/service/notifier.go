package service

import (
	"fmt"
	"io"

	"github.com/CristianoSword/web-fullstack-study/2-backend/13-go/02-structs-interfaces-oop/internal/domain"
)

type WriterNotifier struct {
	writer io.Writer
}

func NewWriterNotifier(writer io.Writer) *WriterNotifier {
	return &WriterNotifier{writer: writer}
}

func (n *WriterNotifier) SendBorrowReceipt(member domain.Member, book domain.Book, loan domain.Loan) error {
	_, err := fmt.Fprintf(
		n.writer,
		"[notify] borrow member=%s book=%s loan=%s due=%s\n",
		member.ID,
		book.ID,
		loan.ID,
		loan.DueAt.Format("2006-01-02"),
	)
	return err
}

func (n *WriterNotifier) SendReturnReceipt(member domain.Member, book domain.Book, loan domain.Loan) error {
	_, err := fmt.Fprintf(
		n.writer,
		"[notify] return member=%s book=%s loan=%s status=%s\n",
		member.ID,
		book.ID,
		loan.ID,
		loan.Status,
	)
	return err
}
