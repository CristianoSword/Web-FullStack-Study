package ui

import (
	"bufio"
	"fmt"
	"io"
	"strings"

	"github.com/CristianoSword/web-fullstack-study/2-backend/13-go/02-structs-interfaces-oop/internal/domain"
	"github.com/CristianoSword/web-fullstack-study/2-backend/13-go/02-structs-interfaces-oop/internal/service"
)

type App struct {
	in      io.Reader
	out     io.Writer
	service *service.LibraryService
}

func NewApp(in io.Reader, out io.Writer, service *service.LibraryService) *App {
	return &App{in: in, out: out, service: service}
}

func (a *App) Run() error {
	scanner := bufio.NewScanner(a.in)
	a.printWelcome()

	for {
		fmt.Fprint(a.out, "library> ")
		if !scanner.Scan() {
			fmt.Fprintln(a.out, "Session closed.")
			return scanner.Err()
		}

		line := strings.TrimSpace(scanner.Text())
		if line == "" {
			continue
		}

		shouldExit, err := a.handle(line)
		if err != nil {
			fmt.Fprintf(a.out, "Error: %v\n", err)
			continue
		}
		if shouldExit {
			fmt.Fprintln(a.out, "Bye.")
			return nil
		}
	}
}

func (a *App) handle(line string) (bool, error) {
	tokens := strings.Fields(line)
	command := strings.ToLower(tokens[0])

	switch command {
	case "help":
		a.printHelp()
	case "list-books":
		a.printBooks(a.service.ListBooks())
	case "list-members":
		a.printMembers(a.service.ListMembers())
	case "list-loans":
		a.printLoans(a.service.ListLoans())
	case "search":
		if len(tokens) < 2 {
			return false, fmt.Errorf("usage: search <term>")
		}
		a.printBooks(a.service.SearchBooks(strings.Join(tokens[1:], " ")))
	case "borrow":
		if len(tokens) != 3 {
			return false, fmt.Errorf("usage: borrow <book-id> <member-id>")
		}
		loan, err := a.service.BorrowBook(tokens[1], tokens[2])
		if err != nil {
			return false, err
		}
		fmt.Fprintf(a.out, "Loan created: %s due=%s\n", loan.ID, loan.DueAt.Format("2006-01-02"))
	case "return":
		if len(tokens) != 2 {
			return false, fmt.Errorf("usage: return <loan-id>")
		}
		loan, err := a.service.ReturnBook(tokens[1])
		if err != nil {
			return false, err
		}
		fmt.Fprintf(a.out, "Loan returned: %s status=%s\n", loan.ID, loan.Status)
	case "exit", "quit":
		return true, nil
	default:
		return false, fmt.Errorf("unknown command: %s", command)
	}
	return false, nil
}

func (a *App) printWelcome() {
	fmt.Fprintln(a.out, "Library Management CLI")
	fmt.Fprintln(a.out, "Type help to see supported commands.")
}

func (a *App) printHelp() {
	fmt.Fprintln(a.out, "Commands:")
	fmt.Fprintln(a.out, "  list-books")
	fmt.Fprintln(a.out, "  list-members")
	fmt.Fprintln(a.out, "  list-loans")
	fmt.Fprintln(a.out, "  search <term>")
	fmt.Fprintln(a.out, "  borrow <book-id> <member-id>")
	fmt.Fprintln(a.out, "  return <loan-id>")
	fmt.Fprintln(a.out, "  help")
	fmt.Fprintln(a.out, "  exit")
}

func (a *App) printBooks(books []domain.Book) {
	for _, book := range books {
		fmt.Fprintf(
			a.out,
			"%s | %s | %s | available=%d/%d\n",
			book.ID,
			book.Title,
			book.Author,
			book.AvailableCopies(),
			book.TotalCopies,
		)
	}
}

func (a *App) printMembers(members []domain.Member) {
	for _, member := range members {
		fmt.Fprintf(
			a.out,
			"%s | %s | tier=%s | active=%t | max=%d\n",
			member.ID,
			member.Name,
			member.Tier,
			member.Active,
			member.MaxConcurrent,
		)
	}
}

func (a *App) printLoans(loans []domain.Loan) {
	if len(loans) == 0 {
		fmt.Fprintln(a.out, "No loans registered.")
		return
	}
	for _, loan := range loans {
		fmt.Fprintf(
			a.out,
			"%s | book=%s | member=%s | status=%s | due=%s\n",
			loan.ID,
			loan.BookID,
			loan.MemberID,
			loan.Status,
			loan.DueAt.Format("2006-01-02"),
		)
	}
}
