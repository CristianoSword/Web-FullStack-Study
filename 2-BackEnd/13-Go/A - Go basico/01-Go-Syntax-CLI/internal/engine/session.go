package engine

import "github.com/CristianoSword/web-fullstack-study/2-backend/13-go/01-go-syntax-cli/internal/domain"

type Session struct {
	history []domain.CalculationRecord
	stats   domain.SessionStats
}

func NewSession() *Session {
	return &Session{
		history: make([]domain.CalculationRecord, 0),
	}
}

func (s *Session) RegisterCommand() {
	s.stats.CommandsProcessed++
}

func (s *Session) RegisterCalculation(record domain.CalculationRecord) {
	s.history = append(s.history, record)
	s.stats.CalculationsRun++
	s.stats.LastResult = record.Result
	s.stats.HasResult = true
}

func (s *Session) History() []domain.CalculationRecord {
	return append([]domain.CalculationRecord(nil), s.history...)
}

func (s *Session) Stats() domain.SessionStats {
	return s.stats
}

func (s *Session) ClearHistory() {
	s.history = make([]domain.CalculationRecord, 0)
}
