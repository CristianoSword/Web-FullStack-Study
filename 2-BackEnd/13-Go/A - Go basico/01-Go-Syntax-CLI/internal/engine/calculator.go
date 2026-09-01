package engine

import (
	"errors"
	"fmt"
	"math"

	"github.com/CristianoSword/web-fullstack-study/2-backend/13-go/01-go-syntax-cli/internal/domain"
)

func Calculate(operation domain.OperationType, args []float64) (float64, error) {
	if len(args) < 2 {
		return 0, errors.New("at least two numeric arguments are required")
	}

	switch operation {
	case domain.OperationAdd:
		total := 0.0
		for _, value := range args {
			total += value
		}
		return total, nil
	case domain.OperationSub:
		total := args[0]
		for _, value := range args[1:] {
			total -= value
		}
		return total, nil
	case domain.OperationMul:
		total := 1.0
		for _, value := range args {
			total *= value
		}
		return total, nil
	case domain.OperationDiv:
		total := args[0]
		for _, value := range args[1:] {
			if value == 0 {
				return 0, errors.New("division by zero is not allowed")
			}
			total /= value
		}
		return total, nil
	case domain.OperationMod:
		if len(args) != 2 {
			return 0, errors.New("mod requires exactly two arguments")
		}
		if args[1] == 0 {
			return 0, errors.New("modulo by zero is not allowed")
		}
		return math.Mod(args[0], args[1]), nil
	case domain.OperationPow:
		if len(args) != 2 {
			return 0, errors.New("pow requires exactly two arguments")
		}
		return math.Pow(args[0], args[1]), nil
	case domain.OperationAvg:
		total := 0.0
		for _, value := range args {
			total += value
		}
		return total / float64(len(args)), nil
	default:
		return 0, fmt.Errorf("unsupported operation: %s", operation)
	}
}
