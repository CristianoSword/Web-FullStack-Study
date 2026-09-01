package parser

import (
	"fmt"
	"strconv"
	"strings"

	"github.com/CristianoSword/web-fullstack-study/2-backend/13-go/01-go-syntax-cli/internal/domain"
)

var operationMap = map[string]domain.OperationType{
	"add": domain.OperationAdd,
	"sub": domain.OperationSub,
	"mul": domain.OperationMul,
	"div": domain.OperationDiv,
	"mod": domain.OperationMod,
	"pow": domain.OperationPow,
	"avg": domain.OperationAvg,
}

func Parse(input string) (domain.ParsedCommand, error) {
	raw := strings.TrimSpace(input)
	if raw == "" {
		return domain.ParsedCommand{}, fmt.Errorf("command cannot be empty")
	}

	tokens := strings.Fields(strings.ToLower(raw))
	head := tokens[0]

	switch head {
	case "history":
		return domain.ParsedCommand{Type: domain.CommandHistory, Raw: raw}, nil
	case "stats":
		return domain.ParsedCommand{Type: domain.CommandStats, Raw: raw}, nil
	case "help":
		return domain.ParsedCommand{Type: domain.CommandHelp, Raw: raw}, nil
	case "exit", "quit":
		return domain.ParsedCommand{Type: domain.CommandExit, Raw: raw}, nil
	case "clear":
		return domain.ParsedCommand{Type: domain.CommandClear, Raw: raw}, nil
	}

	operation, ok := operationMap[head]
	if !ok {
		return domain.ParsedCommand{}, fmt.Errorf("unknown command: %s", head)
	}

	args := make([]float64, 0, len(tokens)-1)
	for _, token := range tokens[1:] {
		value, err := strconv.ParseFloat(token, 64)
		if err != nil {
			return domain.ParsedCommand{}, fmt.Errorf("invalid number: %s", token)
		}
		args = append(args, value)
	}

	return domain.ParsedCommand{
		Type:      domain.CommandCalculation,
		Operation: operation,
		Args:      args,
		Raw:       raw,
	}, nil
}
