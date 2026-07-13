using Study.CSharp.Grpc.InventoryService.Contracts;
using Study.CSharp.Grpc.InventoryService.Models;

namespace Study.CSharp.Grpc.InventoryService.Services;

public sealed class InventoryManager
{
    private readonly IInventoryRepository _repository;

    public InventoryManager(IInventoryRepository repository)
    {
        _repository = repository;
    }

    public Task<InventoryItem?> GetBySkuAsync(string sku, CancellationToken cancellationToken = default)
    {
        return _repository.FindBySkuAsync(sku, cancellationToken);
    }

    public async Task<(bool Accepted, string Message)> ReserveAsync(string sku, int quantity, CancellationToken cancellationToken = default)
    {
        var item = await _repository.FindBySkuAsync(sku, cancellationToken);
        if (item is null)
        {
            return (false, "SKU not found.");
        }

        if (item.AvailableQuantity < quantity)
        {
            return (false, "Not enough stock available.");
        }

        item.AvailableQuantity -= quantity;
        await _repository.UpdateAsync(item, cancellationToken);
        return (true, "Stock reserved successfully.");
    }
}
