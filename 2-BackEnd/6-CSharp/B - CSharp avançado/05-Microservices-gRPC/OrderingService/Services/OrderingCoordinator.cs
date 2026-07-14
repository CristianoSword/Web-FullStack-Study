using Study.CSharp.Grpc.OrderingService.Contracts;
using Study.CSharp.Grpc.OrderingService.Models;
using Study.CSharp.Grpc.OrderingService.Validation;

namespace Study.CSharp.Grpc.OrderingService.Services;

public sealed class OrderingCoordinator
{
    private readonly IOrderRepository _repository;
    private readonly InventoryGateway _inventoryGateway;
    private readonly OrderRequestValidator _validator;

    public OrderingCoordinator(
        IOrderRepository repository,
        InventoryGateway inventoryGateway,
        OrderRequestValidator validator)
    {
        _repository = repository;
        _inventoryGateway = inventoryGateway;
        _validator = validator;
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
        _validator.Validate(customerEmail, sku, quantity);
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
