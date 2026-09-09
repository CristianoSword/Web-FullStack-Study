package domain

import "time"

type User struct {
	ID       string
	Username string
	Password string
	Role     string
}

type Session struct {
	Token     string
	UserID    string
	Username  string
	Role      string
	ExpiresAt time.Time
	IssuedAt  time.Time
}
