package domain

import "time"

type ClientState struct {
	IP           string
	Tokens       int
	LastRefillAt time.Time
	LastSeenAt   time.Time
	Allowed      int
	Blocked      int
}
