package main

import (
	"log"
	"net/http"

	"study/docker/multistageoptimizer/internal/config"
	"study/docker/multistageoptimizer/internal/httpapi"
)

func main() {
	settings := config.Load()
	server := httpapi.NewServer(settings)

	log.Printf("listening on %s", settings.Address())
	if err := http.ListenAndServe(settings.Address(), server.Router()); err != nil {
		log.Fatal(err)
	}
}
