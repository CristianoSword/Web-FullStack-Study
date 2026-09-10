package main

import (
	"context"
	"flag"
	"fmt"
	"log"
	"time"

	"google.golang.org/grpc"
	"google.golang.org/grpc/credentials/insecure"

	"github.com/CristianoSword/web-fullstack-study/2-backend/13-go/04-grpc-microservice-go/internal/pb"
)

func main() {
	address := flag.String("address", "localhost:50051", "grpc server address")
	mode := flag.String("mode", "login", "login or validate")
	username := flag.String("username", "", "username for login")
	password := flag.String("password", "", "password for login")
	token := flag.String("token", "", "access token for validation")
	flag.Parse()

	connection, err := grpc.NewClient(*address, grpc.WithTransportCredentials(insecure.NewCredentials()))
	if err != nil {
		log.Fatalf("dial grpc server: %v", err)
	}
	defer connection.Close()

	client := pb.NewAuthServiceClient(connection)
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	switch *mode {
	case "login":
		response, err := client.Login(ctx, &pb.LoginRequest{
			Username: *username,
			Password: *password,
		})
		if err != nil {
			log.Fatalf("login rpc failed: %v", err)
		}
		fmt.Printf("token=%s user=%s role=%s expires=%d\n", response.GetAccessToken(), response.GetUsername(), response.GetRole(), response.GetExpiresAtUnix())
	case "validate":
		response, err := client.ValidateToken(ctx, &pb.ValidateTokenRequest{
			AccessToken: *token,
		})
		if err != nil {
			log.Fatalf("validate rpc failed: %v", err)
		}
		fmt.Printf("valid=%t user=%s role=%s expires=%d\n", response.GetValid(), response.GetUsername(), response.GetRole(), response.GetExpiresAtUnix())
	default:
		log.Fatalf("unsupported mode %s", *mode)
	}
}
