package ui

import (
	"bytes"
	"strings"
	"testing"

	"github.com/CristianoSword/web-fullstack-study/2-backend/13-go/03-slice-map-manipulator/internal/domain"
	"github.com/CristianoSword/web-fullstack-study/2-backend/13-go/03-slice-map-manipulator/internal/service"
)

func TestAppRun(t *testing.T) {
	inventoryService, err := service.NewInventoryService([]domain.InventoryItem{
		{SKU: "sku-100", Name: "keyboard", Category: "peripherals", Stock: 15, PriceCents: 21990, Tags: []string{"input"}},
		{SKU: "sku-200", Name: "dock", Category: "accessories", Stock: 4, PriceCents: 31990, Tags: []string{"usb-c"}},
	}, 5)
	if err != nil {
		t.Fatalf("expected service setup, got %v", err)
	}

	input := strings.Join([]string{
		"summary",
		"find sku-100",
		"sort stock",
		"group stock-band",
		"add sku-300 headset audio 20 40990 voice,wireless",
		"search voice",
		"restock sku-200 3",
		"remove sku-100",
		"exit",
	}, "\n")

	var output bytes.Buffer
	app := NewApp(strings.NewReader(input), &output, inventoryService)

	if err := app.Run(); err != nil {
		t.Fatalf("expected cli run to succeed, got %v", err)
	}

	transcript := output.String()
	expectedSnippets := []string{
		"Inventory Slice & Map Manipulator",
		"items=2 units=19 categories=2 low-stock=1",
		"SKU-100 | keyboard",
		"[critical]",
		"Item added: SKU-300",
		"Stock updated: SKU-200 now has 7 units",
		"Item removed: SKU-100",
		"Bye.",
	}
	for _, snippet := range expectedSnippets {
		if !strings.Contains(transcript, snippet) {
			t.Fatalf("expected transcript to contain %q\n%s", snippet, transcript)
		}
	}
}
