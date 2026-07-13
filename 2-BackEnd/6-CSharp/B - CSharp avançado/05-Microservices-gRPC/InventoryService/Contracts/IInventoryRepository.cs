using Study.CSharp.Grpc.InventoryService.Models;

namespace Study.CSharp.Grpc.InventoryService.Contracts;

public interface IInventoryRepository
{
    Task<IReadOnlyCollection<InventoryItem>> ListAsync(CancellationToken cancellationToken = default);
    Task<InventoryItem?> FindBySkuAsync(string sku, CancellationToken cancellationToken = default);
    Task UpdateAsync(InventoryItem item, CancellationToken cancellationToken = default);
}
