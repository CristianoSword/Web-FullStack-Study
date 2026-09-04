package main

import (
	"log"
	"os"

	"github.com/CristianoSword/web-fullstack-study/2-backend/13-go/03-slice-map-manipulator/internal/domain"
	"github.com/CristianoSword/web-fullstack-study/2-backend/13-go/03-slice-map-manipulator/internal/service"
	"github.com/CristianoSword/web-fullstack-study/2-backend/13-go/03-slice-map-manipulator/internal/ui"
)

func main() {
	inventoryService, err := service.NewInventoryService(seedInventory(), 5)
	if err != nil {
		log.Fatalf("unable to bootstrap inventory: %v", err)
	}

	app := ui.NewApp(os.Stdin, os.Stdout, inventoryService)
	if err := app.Run(); err != nil {
		log.Fatalf("inventory cli exited with error: %v", err)
	}
}

func seedInventory() []domain.InventoryItem {
	return []domain.InventoryItem{
		{
			SKU:        "sku-100",
			Name:       "mechanical-keyboard",
			Category:   "peripherals",
			Stock:      14,
			PriceCents: 45990,
			Tags:       []string{"gaming", "input"},
		},
		{
			SKU:        "sku-200",
			Name:       "wireless-mouse",
			Category:   "peripherals",
			Stock:      7,
			PriceCents: 22990,
			Tags:       []string{"portable", "input"},
		},
		{
			SKU:        "sku-300",
			Name:       "usb-c-dock",
			Category:   "accessories",
			Stock:      3,
			PriceCents: 37990,
			Tags:       []string{"usb-c", "office"},
		},
	}
}
