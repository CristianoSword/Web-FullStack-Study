package domain

type Metrics struct {
	TrackedClients int `json:"tracked_clients"`
	AllowedTotal   int `json:"allowed_total"`
	BlockedTotal   int `json:"blocked_total"`
}
