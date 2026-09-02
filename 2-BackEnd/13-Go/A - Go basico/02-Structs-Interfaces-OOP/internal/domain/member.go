package domain

type MemberTier string

const (
	TierStandard MemberTier = "standard"
	TierPremium  MemberTier = "premium"
)

type Member struct {
	ID            string
	Name          string
	Email         string
	Tier          MemberTier
	MaxConcurrent int
	Active        bool
}

func (m Member) CanBorrow(currentLoans int) bool {
	return m.Active && currentLoans < m.MaxConcurrent
}
