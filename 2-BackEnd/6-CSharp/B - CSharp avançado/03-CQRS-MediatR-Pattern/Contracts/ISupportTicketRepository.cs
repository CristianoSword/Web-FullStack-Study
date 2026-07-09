using Study.CSharp.CqrsMediatRPattern.Domain;

namespace Study.CSharp.CqrsMediatRPattern.Contracts;

public interface ISupportTicketRepository
{
    Task<IReadOnlyCollection<SupportTicket>> ListAsync(CancellationToken cancellationToken = default);
    Task<SupportTicket?> FindByIdAsync(Guid id, CancellationToken cancellationToken = default);
    Task AddAsync(SupportTicket ticket, CancellationToken cancellationToken = default);
    Task UpdateAsync(SupportTicket ticket, CancellationToken cancellationToken = default);
}
