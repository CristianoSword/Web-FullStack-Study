using Study.CSharp.Grpc.OrderingService.Contracts;
using Study.CSharp.Grpc.OrderingService.Models;

namespace Study.CSharp.Grpc.OrderingService.Services;

public sealed class OrderingCoordinator
{
    private readonly IOrderRepository _repository;
    private readonly InventoryGateway _inventoryGateway;

    public OrderingCoordinator(IOrderRepository repository, InventoryGateway inventoryGateway)
    {
        _repository = repository;
        _inventoryGateway = inventoryGateway;
    }

    public Task<OrderRecord?> FindByIdAsync(Guid orderId, CancellationToken cancellationToken = default)
    {
        return _repository.FindByIdAsync(orderId, cancellationToken);
    }

    public async Task<(OrderRecord? Order, string Message)> CreateOrderAsync(
        string customerEmail,
        string sku,
        int quantity,
        CancellationToken cancellationToken = default)
    {
        var reservation = await _inventoryGateway.ReserveAsync(sku, quantity, cancellationToken);
        if (!reservation.Accepted)
        {
            return (null, reservation.Message);
        }

        var order = new OrderRecord
        {
            Id = Guid.NewGuid(),
            CustomerEmail = customerEmail,
            Sku = sku,
            Quantity = quantity,
            Status = "Accepted",
            CreatedAt = DateTimeOffset.UtcNow,
        };

        await _repository.AddAsync(order, cancellationToken);
        return (order, "Order accepted.");
    }
}
