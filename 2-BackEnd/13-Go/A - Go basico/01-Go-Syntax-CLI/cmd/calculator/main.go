package main

import (
	"log"
	"os"

	"github.com/CristianoSword/web-fullstack-study/2-backend/13-go/01-go-syntax-cli/internal/ui"
)

func main() {
	repl := ui.NewREPL(os.Stdin, os.Stdout)
	if err := repl.Run(); err != nil {
		log.Fatalf("calculator exited with error: %v", err)
	}
}
