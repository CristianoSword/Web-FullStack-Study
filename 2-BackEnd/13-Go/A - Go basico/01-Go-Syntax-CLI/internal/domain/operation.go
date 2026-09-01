package domain

type OperationType string

const (
	OperationAdd OperationType = "add"
	OperationSub OperationType = "sub"
	OperationMul OperationType = "mul"
	OperationDiv OperationType = "div"
	OperationMod OperationType = "mod"
	OperationPow OperationType = "pow"
	OperationAvg OperationType = "avg"
)

type CalculationRecord struct {
	Operation OperationType
	Operands  []float64
	Result    float64
}
