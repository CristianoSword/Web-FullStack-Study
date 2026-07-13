using Study.CSharp.Grpc.OrderingService.Contracts;
using Study.CSharp.Grpc.OrderingService.Models;

namespace Study.CSharp.Grpc.OrderingService.Repositories;

public sealed class InMemoryOrderRepository : IOrderRepository
{
    private readonly List<OrderRecord> _orders = new();

    public Task<IReadOnlyCollection<OrderRecord>> ListAsync(CancellationToken cancellationToken = default)
    {
        return Task.FromResult<IReadOnlyCollection<OrderRecord>>(_orders.OrderByDescending(order => order.CreatedAt).ToArray());
    }

    public Task<OrderRecord?> FindByIdAsync(Guid orderId, CancellationToken cancellationToken = default)
    {
        return Task.FromResult(_orders.FirstOrDefault(order => order.Id == orderId));
    }

    public Task AddAsync(OrderRecord order, CancellationToken cancellationToken = default)
    {
        _orders.Add(order);
        return Task.CompletedTask;
    }
}
