package ui

import (
	"bufio"
	"fmt"
	"io"
	"strconv"
	"strings"

	"github.com/CristianoSword/web-fullstack-study/2-backend/13-go/03-slice-map-manipulator/internal/domain"
	"github.com/CristianoSword/web-fullstack-study/2-backend/13-go/03-slice-map-manipulator/internal/service"
)

type App struct {
	in      io.Reader
	out     io.Writer
	service *service.InventoryService
}

func NewApp(in io.Reader, out io.Writer, service *service.InventoryService) *App {
	return &App{in: in, out: out, service: service}
}

func (a *App) Run() error {
	scanner := bufio.NewScanner(a.in)
	a.printWelcome()

	for {
		fmt.Fprint(a.out, "inventory> ")
		if !scanner.Scan() {
			fmt.Fprintln(a.out, "Session closed.")
			return scanner.Err()
		}

		line := strings.TrimSpace(scanner.Text())
		if line == "" {
			continue
		}

		shouldExit, err := a.handle(line)
		if err != nil {
			fmt.Fprintf(a.out, "Error: %v\n", err)
			continue
		}
		if shouldExit {
			fmt.Fprintln(a.out, "Bye.")
			return nil
		}
	}
}

func (a *App) handle(line string) (bool, error) {
	tokens := strings.Fields(line)
	command := strings.ToLower(tokens[0])

	switch command {
	case "help":
		a.printHelp()
	case "list":
		a.printItems(a.service.ListItems())
	case "find":
		if len(tokens) != 2 {
			return false, fmt.Errorf("usage: find <sku>")
		}
		item, ok := a.service.FindBySKU(tokens[1])
		if !ok {
			return false, fmt.Errorf("item not found: %s", tokens[1])
		}
		a.printItems([]domain.InventoryItem{item})
	case "search":
		if len(tokens) < 2 {
			return false, fmt.Errorf("usage: search <term>")
		}
		a.printItems(a.service.Search(strings.Join(tokens[1:], " ")))
	case "sort":
		if len(tokens) != 2 {
			return false, fmt.Errorf("usage: sort <sku|name|stock|category>")
		}
		items, err := a.service.SortItems(domain.SortMode(tokens[1]))
		if err != nil {
			return false, err
		}
		a.printItems(items)
	case "group":
		if len(tokens) != 2 {
			return false, fmt.Errorf("usage: group <category|stock-band>")
		}
		groups, err := a.service.GroupItems(domain.GroupMode(tokens[1]))
		if err != nil {
			return false, err
		}
		a.printGroups(groups)
	case "add":
		item, err := parseAddCommand(tokens)
		if err != nil {
			return false, err
		}
		if err := a.service.AddItem(item); err != nil {
			return false, err
		}
		fmt.Fprintf(a.out, "Item added: %s\n", strings.ToUpper(item.SKU))
	case "restock":
		if len(tokens) != 3 {
			return false, fmt.Errorf("usage: restock <sku> <delta>")
		}
		delta, err := strconv.Atoi(tokens[2])
		if err != nil {
			return false, fmt.Errorf("delta must be numeric")
		}
		item, err := a.service.RestockItem(tokens[1], delta)
		if err != nil {
			return false, err
		}
		fmt.Fprintf(a.out, "Stock updated: %s now has %d units\n", item.SKU, item.Stock)
	case "remove":
		if len(tokens) != 2 {
			return false, fmt.Errorf("usage: remove <sku>")
		}
		if err := a.service.RemoveItem(tokens[1]); err != nil {
			return false, err
		}
		fmt.Fprintf(a.out, "Item removed: %s\n", strings.ToUpper(tokens[1]))
	case "summary":
		a.printSummary(a.service.Summary())
	case "exit", "quit":
		return true, nil
	default:
		return false, fmt.Errorf("unknown command: %s", command)
	}
	return false, nil
}

func parseAddCommand(tokens []string) (domain.InventoryItem, error) {
	if len(tokens) < 5 {
		return domain.InventoryItem{}, fmt.Errorf("usage: add <sku> <name> <category> <stock> [price-cents] [tag1,tag2]")
	}
	stock, err := strconv.Atoi(tokens[4])
	if err != nil {
		return domain.InventoryItem{}, fmt.Errorf("stock must be numeric")
	}

	priceCents := 0
	if len(tokens) >= 6 {
		priceCents, err = strconv.Atoi(tokens[5])
		if err != nil {
			return domain.InventoryItem{}, fmt.Errorf("price-cents must be numeric")
		}
	}

	var tags []string
	if len(tokens) >= 7 {
		tags = strings.Split(tokens[6], ",")
	}

	return domain.InventoryItem{
		SKU:        tokens[1],
		Name:       tokens[2],
		Category:   tokens[3],
		Stock:      stock,
		PriceCents: priceCents,
		Tags:       tags,
	}, nil
}

func (a *App) printWelcome() {
	fmt.Fprintln(a.out, "Inventory Slice & Map Manipulator")
	fmt.Fprintln(a.out, "Type help to inspect supported commands.")
}

func (a *App) printHelp() {
	fmt.Fprintln(a.out, "Commands:")
	fmt.Fprintln(a.out, "  list")
	fmt.Fprintln(a.out, "  find <sku>")
	fmt.Fprintln(a.out, "  search <term>")
	fmt.Fprintln(a.out, "  sort <sku|name|stock|category>")
	fmt.Fprintln(a.out, "  group <category|stock-band>")
	fmt.Fprintln(a.out, "  add <sku> <name> <category> <stock> [price-cents] [tag1,tag2]")
	fmt.Fprintln(a.out, "  restock <sku> <delta>")
	fmt.Fprintln(a.out, "  remove <sku>")
	fmt.Fprintln(a.out, "  summary")
	fmt.Fprintln(a.out, "  help")
	fmt.Fprintln(a.out, "  exit")
}

func (a *App) printItems(items []domain.InventoryItem) {
	if len(items) == 0 {
		fmt.Fprintln(a.out, "No items matched the request.")
		return
	}
	for _, item := range items {
		fmt.Fprintf(
			a.out,
			"%s | %s | category=%s | stock=%d | price=%d | tags=%s\n",
			item.SKU,
			item.Name,
			item.Category,
			item.Stock,
			item.PriceCents,
			strings.Join(item.Tags, ","),
		)
	}
}

func (a *App) printGroups(groups []domain.InventoryGroup) {
	if len(groups) == 0 {
		fmt.Fprintln(a.out, "No groups generated.")
		return
	}
	for _, group := range groups {
		fmt.Fprintf(a.out, "[%s]\n", group.Key)
		a.printItems(group.Items)
	}
}

func (a *App) printSummary(summary domain.InventorySummary) {
	fmt.Fprintf(
		a.out,
		"items=%d units=%d categories=%d low-stock=%d\n",
		summary.TotalItems,
		summary.TotalUnits,
		summary.TotalCategories,
		summary.LowStockItems,
	)
}
