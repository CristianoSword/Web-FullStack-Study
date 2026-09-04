package service

import (
	"reflect"
	"testing"

	"github.com/CristianoSword/web-fullstack-study/2-backend/13-go/03-slice-map-manipulator/internal/domain"
)

func TestInventoryServiceLifecycle(t *testing.T) {
	service, err := NewInventoryService([]domain.InventoryItem{
		{
			SKU:        "sku-100",
			Name:       "keyboard",
			Category:   "peripherals",
			Stock:      12,
			PriceCents: 19990,
			Tags:       []string{"input", "gaming"},
		},
		{
			SKU:        "sku-200",
			Name:       "dock",
			Category:   "accessories",
			Stock:      4,
			PriceCents: 24990,
			Tags:       []string{"usb-c"},
		},
	}, 5)
	if err != nil {
		t.Fatalf("expected seeded service, got error %v", err)
	}

	if err := service.AddItem(domain.InventoryItem{
		SKU:        "sku-300",
		Name:       "headset",
		Category:   "audio",
		Stock:      22,
		PriceCents: 32990,
		Tags:       []string{"voice"},
	}); err != nil {
		t.Fatalf("expected add item to succeed, got %v", err)
	}

	item, ok := service.FindBySKU("SKU-300")
	if !ok {
		t.Fatalf("expected find by sku to return item")
	}
	if item.Name != "headset" {
		t.Fatalf("expected headset, got %s", item.Name)
	}

	results := service.Search("usb-c")
	if len(results) != 1 || results[0].SKU != "SKU-200" {
		t.Fatalf("expected usb-c search to find SKU-200, got %#v", results)
	}

	restocked, err := service.RestockItem("sku-200", 6)
	if err != nil {
		t.Fatalf("expected restock to succeed, got %v", err)
	}
	if restocked.Stock != 10 {
		t.Fatalf("expected stock 10, got %d", restocked.Stock)
	}

	if err := service.RemoveItem("sku-100"); err != nil {
		t.Fatalf("expected remove to succeed, got %v", err)
	}
	if _, ok := service.FindBySKU("sku-100"); ok {
		t.Fatalf("expected removed item to disappear from map index")
	}
}

func TestSortAndGroup(t *testing.T) {
	service, err := NewInventoryService([]domain.InventoryItem{
		{SKU: "sku-300", Name: "headset", Category: "audio", Stock: 25},
		{SKU: "sku-100", Name: "keyboard", Category: "peripherals", Stock: 3},
		{SKU: "sku-200", Name: "dock", Category: "accessories", Stock: 10},
	}, 5)
	if err != nil {
		t.Fatalf("expected seeded service, got error %v", err)
	}

	sorted, err := service.SortItems(domain.SortByStock)
	if err != nil {
		t.Fatalf("expected stock sort to succeed, got %v", err)
	}
	gotOrder := []string{sorted[0].SKU, sorted[1].SKU, sorted[2].SKU}
	wantOrder := []string{"SKU-100", "SKU-200", "SKU-300"}
	if !reflect.DeepEqual(gotOrder, wantOrder) {
		t.Fatalf("unexpected order: got %v want %v", gotOrder, wantOrder)
	}

	groups, err := service.GroupItems(domain.GroupByStockBand)
	if err != nil {
		t.Fatalf("expected grouping to succeed, got %v", err)
	}
	if len(groups) != 3 {
		t.Fatalf("expected 3 stock-band groups, got %d", len(groups))
	}
	if groups[0].Key != "surplus" && groups[0].Key != "critical" && groups[0].Key != "stable" {
		t.Fatalf("unexpected group key %s", groups[0].Key)
	}
}

func TestSummary(t *testing.T) {
	service, err := NewInventoryService([]domain.InventoryItem{
		{SKU: "sku-100", Name: "keyboard", Category: "peripherals", Stock: 5},
		{SKU: "sku-200", Name: "mouse", Category: "peripherals", Stock: 9},
		{SKU: "sku-300", Name: "camera", Category: "streaming", Stock: 2},
	}, 5)
	if err != nil {
		t.Fatalf("expected seeded service, got error %v", err)
	}

	summary := service.Summary()
	if summary.TotalItems != 3 || summary.TotalUnits != 16 || summary.TotalCategories != 2 || summary.LowStockItems != 2 {
		t.Fatalf("unexpected summary: %#v", summary)
	}
}

func TestValidationErrors(t *testing.T) {
	service, err := NewInventoryService(nil, 5)
	if err != nil {
		t.Fatalf("expected empty service to build, got %v", err)
	}

	if err := service.AddItem(domain.InventoryItem{}); err == nil {
		t.Fatalf("expected invalid item to fail validation")
	}
	if _, err := service.RestockItem("missing", 4); err == nil {
		t.Fatalf("expected restocking missing item to fail")
	}
	if _, err := service.SortItems(domain.SortMode("unknown")); err == nil {
		t.Fatalf("expected unsupported sort mode to fail")
	}
	if _, err := service.GroupItems(domain.GroupMode("unknown")); err == nil {
		t.Fatalf("expected unsupported group mode to fail")
	}
}
