package ui

import (
	"context"
	"net"
	"testing"
	"time"

	"google.golang.org/grpc"
	"google.golang.org/grpc/credentials/insecure"
	"google.golang.org/grpc/test/bufconn"

	"github.com/CristianoSword/web-fullstack-study/2-backend/13-go/04-grpc-microservice-go/internal/domain"
	"github.com/CristianoSword/web-fullstack-study/2-backend/13-go/04-grpc-microservice-go/internal/pb"
	"github.com/CristianoSword/web-fullstack-study/2-backend/13-go/04-grpc-microservice-go/internal/service"
)

func TestGRPCAuthFlow(t *testing.T) {
	authService, err := service.NewAuthService([]domain.User{
		{ID: "user-001", Username: "admin", Password: "admin123", Role: "admin"},
	}, 5*time.Minute)
	if err != nil {
		t.Fatalf("expected auth service setup, got %v", err)
	}

	listener := bufconn.Listen(1024 * 1024)
	grpcServer := grpc.NewServer()
	Register(grpcServer, authService)

	go func() {
		_ = grpcServer.Serve(listener)
	}()
	defer grpcServer.Stop()

	ctx := context.Background()
	connection, err := grpc.DialContext(
		ctx,
		"bufnet",
		grpc.WithContextDialer(func(context.Context, string) (net.Conn, error) {
			return listener.Dial()
		}),
		grpc.WithTransportCredentials(insecure.NewCredentials()),
	)
	if err != nil {
		t.Fatalf("dial bufconn: %v", err)
	}
	defer connection.Close()

	client := pb.NewAuthServiceClient(connection)

	loginResponse, err := client.Login(ctx, &pb.LoginRequest{
		Username: "admin",
		Password: "admin123",
	})
	if err != nil {
		t.Fatalf("expected login rpc to succeed, got %v", err)
	}
	if loginResponse.GetAccessToken() == "" {
		t.Fatalf("expected access token in login response")
	}

	validateResponse, err := client.ValidateToken(ctx, &pb.ValidateTokenRequest{
		AccessToken: loginResponse.GetAccessToken(),
	})
	if err != nil {
		t.Fatalf("expected validate rpc to succeed, got %v", err)
	}
	if !validateResponse.GetValid() || validateResponse.GetUsername() != "admin" {
		t.Fatalf("unexpected validate response: %#v", validateResponse)
	}
}

func TestGRPCInvalidLogin(t *testing.T) {
	authService, err := service.NewAuthService([]domain.User{
		{ID: "user-001", Username: "admin", Password: "admin123", Role: "admin"},
	}, 5*time.Minute)
	if err != nil {
		t.Fatalf("expected auth service setup, got %v", err)
	}

	server := &AuthServer{authService: authService}
	if _, err := server.Login(context.Background(), &pb.LoginRequest{
		Username: "admin",
		Password: "wrong",
	}); err == nil {
		t.Fatalf("expected invalid login to fail")
	}
}
