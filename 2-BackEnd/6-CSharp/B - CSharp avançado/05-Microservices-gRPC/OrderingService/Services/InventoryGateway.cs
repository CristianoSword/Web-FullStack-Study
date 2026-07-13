using Study.CSharp.Grpc.Contracts.Inventory;

namespace Study.CSharp.Grpc.OrderingService.Services;

public sealed class InventoryGateway
{
    private readonly InventoryService.InventoryServiceClient _client;

    public InventoryGateway(InventoryService.InventoryServiceClient client)
    {
        _client = client;
    }

    public async Task<(bool Accepted, string Message)> ReserveAsync(string sku, int quantity, CancellationToken cancellationToken = default)
    {
        var reply = await _client.ReserveStockAsync(
            new ReserveStockRequest
            {
                Sku = sku,
                Quantity = quantity,
            },
            cancellationToken: cancellationToken);

        return (reply.Accepted, reply.Message);
    }
}
