package service

import (
	"fmt"
	"slices"
	"strings"

	"github.com/CristianoSword/web-fullstack-study/2-backend/13-go/03-slice-map-manipulator/internal/domain"
)

type InventoryService struct {
	items             []domain.InventoryItem
	indexBySKU        map[string]int
	lowStockThreshold int
}

func NewInventoryService(seed []domain.InventoryItem, lowStockThreshold int) (*InventoryService, error) {
	service := &InventoryService{
		items:             make([]domain.InventoryItem, 0, len(seed)),
		indexBySKU:        make(map[string]int, len(seed)),
		lowStockThreshold: lowStockThreshold,
	}
	if lowStockThreshold < 0 {
		return nil, fmt.Errorf("low stock threshold must be non-negative")
	}
	for _, item := range seed {
		if err := service.AddItem(item); err != nil {
			return nil, err
		}
	}
	return service, nil
}

func (s *InventoryService) AddItem(item domain.InventoryItem) error {
	normalized, err := normalizeItem(item)
	if err != nil {
		return err
	}
	key := strings.ToLower(normalized.SKU)
	if _, exists := s.indexBySKU[key]; exists {
		return fmt.Errorf("item with sku %s already exists", normalized.SKU)
	}
	s.items = append(s.items, normalized)
	s.indexBySKU[key] = len(s.items) - 1
	return nil
}

func (s *InventoryService) RemoveItem(sku string) error {
	index, ok := s.findIndex(sku)
	if !ok {
		return fmt.Errorf("item not found: %s", sku)
	}
	s.items = append(s.items[:index], s.items[index+1:]...)
	s.rebuildIndex()
	return nil
}

func (s *InventoryService) FindBySKU(sku string) (domain.InventoryItem, bool) {
	index, ok := s.findIndex(sku)
	if !ok {
		return domain.InventoryItem{}, false
	}
	return s.items[index].Clone(), true
}

func (s *InventoryService) RestockItem(sku string, delta int) (domain.InventoryItem, error) {
	if delta == 0 {
		return domain.InventoryItem{}, fmt.Errorf("restock delta must not be zero")
	}
	index, ok := s.findIndex(sku)
	if !ok {
		return domain.InventoryItem{}, fmt.Errorf("item not found: %s", sku)
	}
	item := s.items[index]
	if item.Stock+delta < 0 {
		return domain.InventoryItem{}, fmt.Errorf("stock cannot become negative for %s", item.SKU)
	}
	item.Stock += delta
	s.items[index] = item
	return item.Clone(), nil
}

func (s *InventoryService) Search(term string) []domain.InventoryItem {
	normalizedTerm := strings.ToLower(strings.TrimSpace(term))
	if normalizedTerm == "" {
		return s.ListItems()
	}
	results := make([]domain.InventoryItem, 0)
	for _, item := range s.items {
		if strings.Contains(strings.ToLower(item.SKU), normalizedTerm) ||
			strings.Contains(strings.ToLower(item.Name), normalizedTerm) ||
			strings.Contains(strings.ToLower(item.Category), normalizedTerm) ||
			slices.ContainsFunc(item.Tags, func(tag string) bool {
				return strings.Contains(strings.ToLower(tag), normalizedTerm)
			}) {
			results = append(results, item.Clone())
		}
	}
	return results
}

func (s *InventoryService) ListItems() []domain.InventoryItem {
	items := make([]domain.InventoryItem, 0, len(s.items))
	for _, item := range s.items {
		items = append(items, item.Clone())
	}
	return items
}

func (s *InventoryService) SortItems(mode domain.SortMode) ([]domain.InventoryItem, error) {
	items := s.ListItems()
	switch mode {
	case domain.SortBySKU:
		slices.SortFunc(items, func(left, right domain.InventoryItem) int {
			return strings.Compare(left.SKU, right.SKU)
		})
	case domain.SortByName:
		slices.SortFunc(items, func(left, right domain.InventoryItem) int {
			return strings.Compare(left.Name, right.Name)
		})
	case domain.SortByStock:
		slices.SortFunc(items, func(left, right domain.InventoryItem) int {
			if left.Stock == right.Stock {
				return strings.Compare(left.SKU, right.SKU)
			}
			if left.Stock < right.Stock {
				return -1
			}
			return 1
		})
	case domain.SortByCategory:
		slices.SortFunc(items, func(left, right domain.InventoryItem) int {
			if left.Category == right.Category {
				return strings.Compare(left.Name, right.Name)
			}
			return strings.Compare(left.Category, right.Category)
		})
	default:
		return nil, fmt.Errorf("unsupported sort mode: %s", mode)
	}
	return items, nil
}

func (s *InventoryService) GroupItems(mode domain.GroupMode) ([]domain.InventoryGroup, error) {
	groupedMap := map[string][]domain.InventoryItem{}
	order := make([]string, 0)
	for _, item := range s.items {
		key, err := groupKeyForItem(item, mode)
		if err != nil {
			return nil, err
		}
		if _, exists := groupedMap[key]; !exists {
			order = append(order, key)
		}
		groupedMap[key] = append(groupedMap[key], item.Clone())
	}

	groups := make([]domain.InventoryGroup, 0, len(order))
	for _, key := range order {
		items := groupedMap[key]
		slices.SortFunc(items, func(left, right domain.InventoryItem) int {
			return strings.Compare(left.SKU, right.SKU)
		})
		groups = append(groups, domain.InventoryGroup{
			Key:   key,
			Items: items,
		})
	}
	return groups, nil
}

func (s *InventoryService) Summary() domain.InventorySummary {
	categorySet := map[string]struct{}{}
	summary := domain.InventorySummary{
		TotalItems: len(s.items),
	}
	for _, item := range s.items {
		categorySet[item.Category] = struct{}{}
		summary.TotalUnits += item.Stock
		if item.HasLowStock(s.lowStockThreshold) {
			summary.LowStockItems++
		}
	}
	summary.TotalCategories = len(categorySet)
	return summary
}

func (s *InventoryService) findIndex(sku string) (int, bool) {
	index, ok := s.indexBySKU[strings.ToLower(strings.TrimSpace(sku))]
	return index, ok
}

func (s *InventoryService) rebuildIndex() {
	s.indexBySKU = make(map[string]int, len(s.items))
	for index, item := range s.items {
		s.indexBySKU[strings.ToLower(item.SKU)] = index
	}
}

func normalizeItem(item domain.InventoryItem) (domain.InventoryItem, error) {
	item.SKU = strings.ToUpper(strings.TrimSpace(item.SKU))
	item.Name = strings.TrimSpace(item.Name)
	item.Category = strings.TrimSpace(item.Category)
	if item.SKU == "" {
		return domain.InventoryItem{}, fmt.Errorf("sku is required")
	}
	if item.Name == "" {
		return domain.InventoryItem{}, fmt.Errorf("name is required")
	}
	if item.Category == "" {
		return domain.InventoryItem{}, fmt.Errorf("category is required")
	}
	if item.Stock < 0 {
		return domain.InventoryItem{}, fmt.Errorf("stock must be non-negative")
	}
	if item.PriceCents < 0 {
		return domain.InventoryItem{}, fmt.Errorf("price must be non-negative")
	}
	normalizedTags := make([]string, 0, len(item.Tags))
	for _, tag := range item.Tags {
		cleanTag := strings.ToLower(strings.TrimSpace(tag))
		if cleanTag != "" {
			normalizedTags = append(normalizedTags, cleanTag)
		}
	}
	item.Tags = normalizedTags
	return item, nil
}

func groupKeyForItem(item domain.InventoryItem, mode domain.GroupMode) (string, error) {
	switch mode {
	case domain.GroupByCategory:
		return item.Category, nil
	case domain.GroupByStockBand:
		switch {
		case item.Stock <= 5:
			return "critical", nil
		case item.Stock <= 20:
			return "stable", nil
		default:
			return "surplus", nil
		}
	default:
		return "", fmt.Errorf("unsupported group mode: %s", mode)
	}
}
