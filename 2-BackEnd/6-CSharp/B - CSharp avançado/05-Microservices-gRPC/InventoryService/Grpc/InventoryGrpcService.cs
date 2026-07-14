using Grpc.Core;
using Study.CSharp.Grpc.Contracts.Inventory;
using Study.CSharp.Grpc.InventoryService.Services;

namespace Study.CSharp.Grpc.InventoryService.Grpc;

public sealed class InventoryGrpcService : InventoryService.InventoryServiceBase
{
    private readonly InventoryManager _inventoryManager;

    public InventoryGrpcService(InventoryManager inventoryManager)
    {
        _inventoryManager = inventoryManager;
    }

    public override async Task<ProductStockReply> GetProductStock(ProductStockRequest request, ServerCallContext context)
    {
        var item = await _inventoryManager.GetBySkuAsync(request.Sku, context.CancellationToken);
        if (item is null)
        {
            throw new RpcException(new Status(StatusCode.NotFound, "SKU not found."));
        }

        return new ProductStockReply
        {
            Sku = item.Sku,
            Name = item.Name,
            AvailableQuantity = item.AvailableQuantity,
        };
    }

    public override async Task<ReserveStockReply> ReserveStock(ReserveStockRequest request, ServerCallContext context)
    {
        var result = await _inventoryManager.ReserveAsync(request.Sku, request.Quantity, context.CancellationToken);
        return new ReserveStockReply
        {
            Accepted = result.Accepted,
            Message = result.Message,
        };
    }
}
