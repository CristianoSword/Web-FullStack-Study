package service

import (
	"crypto/rand"
	"encoding/hex"
	"fmt"
	"strings"
	"sync"
	"time"

	"github.com/CristianoSword/web-fullstack-study/2-backend/13-go/04-grpc-microservice-go/internal/domain"
)

type AuthService struct {
	usersByUsername map[string]domain.User
	sessionsByToken map[string]domain.Session
	tokenTTL        time.Duration
	mu              sync.RWMutex
}

func NewAuthService(seedUsers []domain.User, tokenTTL time.Duration) (*AuthService, error) {
	if tokenTTL <= 0 {
		return nil, fmt.Errorf("token ttl must be greater than zero")
	}

	service := &AuthService{
		usersByUsername: make(map[string]domain.User, len(seedUsers)),
		sessionsByToken: make(map[string]domain.Session),
		tokenTTL:        tokenTTL,
	}

	for _, user := range seedUsers {
		username := strings.TrimSpace(strings.ToLower(user.Username))
		if username == "" {
			return nil, fmt.Errorf("seed user username is required")
		}
		if user.Password == "" {
			return nil, fmt.Errorf("seed user password is required")
		}
		if user.ID == "" {
			return nil, fmt.Errorf("seed user id is required")
		}
		service.usersByUsername[username] = user
	}

	return service, nil
}

func (s *AuthService) Login(username string, password string, now time.Time) (domain.Session, error) {
	usernameKey := strings.TrimSpace(strings.ToLower(username))
	password = strings.TrimSpace(password)
	if usernameKey == "" || password == "" {
		return domain.Session{}, fmt.Errorf("username and password are required")
	}

	s.mu.Lock()
	defer s.mu.Unlock()

	user, ok := s.usersByUsername[usernameKey]
	if !ok || user.Password != password {
		return domain.Session{}, fmt.Errorf("invalid credentials")
	}

	token, err := generateToken()
	if err != nil {
		return domain.Session{}, fmt.Errorf("generate token: %w", err)
	}

	session := domain.Session{
		Token:     token,
		UserID:    user.ID,
		Username:  user.Username,
		Role:      user.Role,
		IssuedAt:  now.UTC(),
		ExpiresAt: now.UTC().Add(s.tokenTTL),
	}
	s.sessionsByToken[token] = session
	return session, nil
}

func (s *AuthService) ValidateToken(token string, now time.Time) (domain.Session, error) {
	token = strings.TrimSpace(token)
	if token == "" {
		return domain.Session{}, fmt.Errorf("access token is required")
	}

	s.mu.Lock()
	defer s.mu.Unlock()

	session, ok := s.sessionsByToken[token]
	if !ok {
		return domain.Session{}, fmt.Errorf("token not found")
	}
	if now.UTC().After(session.ExpiresAt) {
		delete(s.sessionsByToken, token)
		return domain.Session{}, fmt.Errorf("token expired")
	}
	return session, nil
}

func (s *AuthService) CleanupExpired(now time.Time) int {
	s.mu.Lock()
	defer s.mu.Unlock()

	removed := 0
	for token, session := range s.sessionsByToken {
		if now.UTC().After(session.ExpiresAt) {
			delete(s.sessionsByToken, token)
			removed++
		}
	}
	return removed
}

func generateToken() (string, error) {
	buffer := make([]byte, 24)
	if _, err := rand.Read(buffer); err != nil {
		return "", err
	}
	return hex.EncodeToString(buffer), nil
}
