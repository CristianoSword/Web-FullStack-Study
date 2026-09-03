package domain

type InventoryItem struct {
	SKU        string
	Name       string
	Category   string
	Stock      int
	PriceCents int
	Tags       []string
}

func (i InventoryItem) HasLowStock(threshold int) bool {
	return i.Stock <= threshold
}

func (i InventoryItem) Clone() InventoryItem {
	clone := i
	clone.Tags = append([]string(nil), i.Tags...)
	return clone
}
