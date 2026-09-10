package main

import (
	"log"
	"net"
	"time"

	"google.golang.org/grpc"

	"github.com/CristianoSword/web-fullstack-study/2-backend/13-go/04-grpc-microservice-go/internal/domain"
	"github.com/CristianoSword/web-fullstack-study/2-backend/13-go/04-grpc-microservice-go/internal/service"
	"github.com/CristianoSword/web-fullstack-study/2-backend/13-go/04-grpc-microservice-go/internal/ui"
)

func main() {
	authService, err := service.NewAuthService(seedUsers(), 30*time.Minute)
	if err != nil {
		log.Fatalf("create auth service: %v", err)
	}

	listener, err := net.Listen("tcp", ":50051")
	if err != nil {
		log.Fatalf("listen tcp: %v", err)
	}

	server := grpc.NewServer()
	ui.Register(server, authService)

	log.Println("gRPC auth server listening on :50051")
	if err := server.Serve(listener); err != nil {
		log.Fatalf("serve grpc: %v", err)
	}
}

func seedUsers() []domain.User {
	return []domain.User{
		{ID: "user-001", Username: "admin", Password: "admin123", Role: "admin"},
		{ID: "user-002", Username: "analyst", Password: "analyst123", Role: "analyst"},
	}
}
