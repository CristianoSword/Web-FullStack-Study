package domain

type SessionStats struct {
	CommandsProcessed int
	CalculationsRun   int
	LastResult        float64
	HasResult         bool
}
