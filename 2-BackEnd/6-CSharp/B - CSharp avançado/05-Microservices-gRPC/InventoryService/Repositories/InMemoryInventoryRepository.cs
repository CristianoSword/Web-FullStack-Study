using Study.CSharp.Grpc.InventoryService.Contracts;
using Study.CSharp.Grpc.InventoryService.Models;

namespace Study.CSharp.Grpc.InventoryService.Repositories;

public sealed class InMemoryInventoryRepository : IInventoryRepository
{
    private readonly List<InventoryItem> _items =
    [
        new InventoryItem { Sku = "KB-1001", Name = "Mechanical Keyboard", AvailableQuantity = 12 },
        new InventoryItem { Sku = "MS-1002", Name = "Wireless Mouse", AvailableQuantity = 20 },
        new InventoryItem { Sku = "HD-1003", Name = "USB-C Hub", AvailableQuantity = 8 }
    ];

    public Task<IReadOnlyCollection<InventoryItem>> ListAsync(CancellationToken cancellationToken = default)
    {
        return Task.FromResult<IReadOnlyCollection<InventoryItem>>(_items.Select(Clone).ToArray());
    }

    public Task<InventoryItem?> FindBySkuAsync(string sku, CancellationToken cancellationToken = default)
    {
        var item = _items.FirstOrDefault(product => string.Equals(product.Sku, sku, StringComparison.OrdinalIgnoreCase));
        return Task.FromResult(item is null ? null : Clone(item));
    }

    public Task UpdateAsync(InventoryItem item, CancellationToken cancellationToken = default)
    {
        var index = _items.FindIndex(product => string.Equals(product.Sku, item.Sku, StringComparison.OrdinalIgnoreCase));
        if (index >= 0)
        {
            _items[index] = Clone(item);
        }

        return Task.CompletedTask;
    }

    private static InventoryItem Clone(InventoryItem item)
    {
        return new InventoryItem
        {
            Sku = item.Sku,
            Name = item.Name,
            AvailableQuantity = item.AvailableQuantity,
        };
    }
}
