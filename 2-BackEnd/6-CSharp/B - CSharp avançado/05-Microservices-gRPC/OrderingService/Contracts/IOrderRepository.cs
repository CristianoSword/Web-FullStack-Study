using Study.CSharp.Grpc.OrderingService.Models;

namespace Study.CSharp.Grpc.OrderingService.Contracts;

public interface IOrderRepository
{
    Task<IReadOnlyCollection<OrderRecord>> ListAsync(CancellationToken cancellationToken = default);
    Task<OrderRecord?> FindByIdAsync(Guid orderId, CancellationToken cancellationToken = default);
    Task AddAsync(OrderRecord order, CancellationToken cancellationToken = default);
}
