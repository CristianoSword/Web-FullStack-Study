package ui

import (
	"context"
	"time"

	"google.golang.org/grpc"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"

	"github.com/CristianoSword/web-fullstack-study/2-backend/13-go/04-grpc-microservice-go/internal/pb"
	"github.com/CristianoSword/web-fullstack-study/2-backend/13-go/04-grpc-microservice-go/internal/service"
)

type AuthServer struct {
	pb.UnimplementedAuthServiceServer
	authService *service.AuthService
}

func Register(server grpc.ServiceRegistrar, authService *service.AuthService) {
	pb.RegisterAuthServiceServer(server, &AuthServer{authService: authService})
}

func (s *AuthServer) Login(ctx context.Context, request *pb.LoginRequest) (*pb.LoginResponse, error) {
	session, err := s.authService.Login(request.GetUsername(), request.GetPassword(), time.Now())
	if err != nil {
		return nil, status.Error(codes.Unauthenticated, err.Error())
	}

	return &pb.LoginResponse{
		AccessToken:   session.Token,
		UserId:        session.UserID,
		Username:      session.Username,
		Role:          session.Role,
		ExpiresAtUnix: session.ExpiresAt.Unix(),
	}, nil
}

func (s *AuthServer) ValidateToken(ctx context.Context, request *pb.ValidateTokenRequest) (*pb.ValidateTokenResponse, error) {
	session, err := s.authService.ValidateToken(request.GetAccessToken(), time.Now())
	if err != nil {
		return nil, status.Error(codes.Unauthenticated, err.Error())
	}

	return &pb.ValidateTokenResponse{
		Valid:         true,
		UserId:        session.UserID,
		Username:      session.Username,
		Role:          session.Role,
		ExpiresAtUnix: session.ExpiresAt.Unix(),
	}, nil
}
