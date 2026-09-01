package ui

import (
	"bufio"
	"fmt"
	"io"
	"strings"

	"github.com/CristianoSword/web-fullstack-study/2-backend/13-go/01-go-syntax-cli/internal/domain"
	"github.com/CristianoSword/web-fullstack-study/2-backend/13-go/01-go-syntax-cli/internal/engine"
	"github.com/CristianoSword/web-fullstack-study/2-backend/13-go/01-go-syntax-cli/internal/parser"
)

type REPL struct {
	in      io.Reader
	out     io.Writer
	session *engine.Session
}

func NewREPL(in io.Reader, out io.Writer) *REPL {
	return &REPL{
		in:      in,
		out:     out,
		session: engine.NewSession(),
	}
}

func (r *REPL) Run() error {
	scanner := bufio.NewScanner(r.in)
	r.printWelcome()

	for {
		fmt.Fprint(r.out, "> ")
		if !scanner.Scan() {
			fmt.Fprintln(r.out, "Session closed.")
			return scanner.Err()
		}

		line := strings.TrimSpace(scanner.Text())
		if line == "" {
			continue
		}

		r.session.RegisterCommand()
		command, err := parser.Parse(line)
		if err != nil {
			fmt.Fprintf(r.out, "Error: %v\n", err)
			continue
		}

		shouldExit, err := r.handleCommand(command)
		if err != nil {
			fmt.Fprintf(r.out, "Error: %v\n", err)
			continue
		}
		if shouldExit {
			fmt.Fprintln(r.out, "Bye.")
			return nil
		}
	}
}

func (r *REPL) handleCommand(command domain.ParsedCommand) (bool, error) {
	switch command.Type {
	case domain.CommandCalculation:
		result, err := engine.Calculate(command.Operation, command.Args)
		if err != nil {
			return false, err
		}
		record := domain.CalculationRecord{
			Operation: command.Operation,
			Operands:  append([]float64(nil), command.Args...),
			Result:    result,
		}
		r.session.RegisterCalculation(record)
		fmt.Fprintf(r.out, "Result: %.4f\n", result)
	case domain.CommandHistory:
		history := r.session.History()
		if len(history) == 0 {
			fmt.Fprintln(r.out, "History is empty.")
			return false, nil
		}
		for index, record := range history {
			fmt.Fprintf(r.out, "%d. %s %v = %.4f\n", index+1, record.Operation, record.Operands, record.Result)
		}
	case domain.CommandStats:
		stats := r.session.Stats()
		fmt.Fprintf(
			r.out,
			"Commands: %d | Calculations: %d | Last Result: %.4f | Has Result: %t\n",
			stats.CommandsProcessed,
			stats.CalculationsRun,
			stats.LastResult,
			stats.HasResult,
		)
	case domain.CommandHelp:
		r.printHelp()
	case domain.CommandClear:
		r.session.ClearHistory()
		fmt.Fprintln(r.out, "History cleared.")
	case domain.CommandExit:
		return true, nil
	}
	return false, nil
}

func (r *REPL) printWelcome() {
	fmt.Fprintln(r.out, "Go Syntax CLI Calculator")
	fmt.Fprintln(r.out, "Type help to see supported commands.")
}

func (r *REPL) printHelp() {
	fmt.Fprintln(r.out, "Commands:")
	fmt.Fprintln(r.out, "  add 10 5 3")
	fmt.Fprintln(r.out, "  sub 10 4")
	fmt.Fprintln(r.out, "  mul 3 8")
	fmt.Fprintln(r.out, "  div 20 5")
	fmt.Fprintln(r.out, "  mod 20 3")
	fmt.Fprintln(r.out, "  pow 2 8")
	fmt.Fprintln(r.out, "  avg 4 8 12")
	fmt.Fprintln(r.out, "  history | stats | clear | help | exit")
}
