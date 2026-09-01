package domain

type CommandType string

const (
	CommandCalculation CommandType = "calculation"
	CommandHistory     CommandType = "history"
	CommandStats       CommandType = "stats"
	CommandHelp        CommandType = "help"
	CommandExit        CommandType = "exit"
	CommandClear       CommandType = "clear"
)

type ParsedCommand struct {
	Type      CommandType
	Operation OperationType
	Args      []float64
	Raw       string
}
