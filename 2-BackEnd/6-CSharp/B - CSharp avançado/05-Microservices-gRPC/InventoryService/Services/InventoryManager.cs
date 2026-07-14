using Study.CSharp.Grpc.InventoryService.Contracts;
using Study.CSharp.Grpc.InventoryService.Models;
using Study.CSharp.Grpc.InventoryService.Validation;

namespace Study.CSharp.Grpc.InventoryService.Services;

public sealed class InventoryManager
{
    private readonly IInventoryRepository _repository;
    private readonly InventoryRequestValidator _validator;

    public InventoryManager(
        IInventoryRepository repository,
        InventoryRequestValidator validator)
    {
        _repository = repository;
        _validator = validator;
    }

    public Task<InventoryItem?> GetBySkuAsync(string sku, CancellationToken cancellationToken = default)
    {
        _validator.ValidateSku(sku);
        return _repository.FindBySkuAsync(sku, cancellationToken);
    }

    public async Task<(bool Accepted, string Message)> ReserveAsync(string sku, int quantity, CancellationToken cancellationToken = default)
    {
        _validator.ValidateReservation(sku, quantity);
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
