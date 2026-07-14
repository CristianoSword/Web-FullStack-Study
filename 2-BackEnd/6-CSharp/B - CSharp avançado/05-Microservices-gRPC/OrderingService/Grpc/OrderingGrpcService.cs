using Grpc.Core;
using Study.CSharp.Grpc.Contracts.Orders;
using Study.CSharp.Grpc.OrderingService.Services;

namespace Study.CSharp.Grpc.OrderingService.Grpc;

public sealed class OrderingGrpcService : OrdersService.OrdersServiceBase
{
    private readonly OrderingCoordinator _orderingCoordinator;

    public OrderingGrpcService(OrderingCoordinator orderingCoordinator)
    {
        _orderingCoordinator = orderingCoordinator;
    }

    public override async Task<CreateOrderReply> CreateOrder(CreateOrderRequest request, ServerCallContext context)
    {
        var created = await _orderingCoordinator.CreateOrderAsync(
            request.CustomerEmail,
            request.Sku,
            request.Quantity,
            context.CancellationToken);

        return new CreateOrderReply
        {
            OrderId = created.Order?.Id.ToString() ?? string.Empty,
            Status = created.Order?.Status ?? "Rejected",
            Message = created.Message,
        };
    }

    public override async Task<GetOrderReply> GetOrder(GetOrderRequest request, ServerCallContext context)
    {
        if (!Guid.TryParse(request.OrderId, out var orderId))
        {
            throw new RpcException(new Status(StatusCode.InvalidArgument, "Order id must be a valid GUID."));
        }

        var order = await _orderingCoordinator.FindByIdAsync(orderId, context.CancellationToken);
        if (order is null)
        {
            throw new RpcException(new Status(StatusCode.NotFound, "Order not found."));
        }

        return new GetOrderReply
        {
            OrderId = order.Id.ToString(),
            CustomerEmail = order.CustomerEmail,
            Sku = order.Sku,
            Quantity = order.Quantity,
            Status = order.Status,
        };
    }
}
