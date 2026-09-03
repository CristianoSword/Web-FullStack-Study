package domain

type SortMode string

const (
	SortBySKU      SortMode = "sku"
	SortByName     SortMode = "name"
	SortByStock    SortMode = "stock"
	SortByCategory SortMode = "category"
)

type GroupMode string

const (
	GroupByCategory  GroupMode = "category"
	GroupByStockBand GroupMode = "stock-band"
)
