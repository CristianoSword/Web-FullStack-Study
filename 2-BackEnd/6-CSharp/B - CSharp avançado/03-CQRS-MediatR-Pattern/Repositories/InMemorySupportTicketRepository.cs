using Study.CSharp.CqrsMediatRPattern.Contracts;
using Study.CSharp.CqrsMediatRPattern.Domain;

namespace Study.CSharp.CqrsMediatRPattern.Repositories;

public sealed class InMemorySupportTicketRepository : ISupportTicketRepository
{
    private readonly List<SupportTicket> _tickets = new();

    public Task<IReadOnlyCollection<SupportTicket>> ListAsync(CancellationToken cancellationToken = default)
    {
        return Task.FromResult<IReadOnlyCollection<SupportTicket>>(_tickets.OrderByDescending(ticket => ticket.CreatedAt).ToArray());
    }

    public Task<SupportTicket?> FindByIdAsync(Guid id, CancellationToken cancellationToken = default)
    {
        return Task.FromResult(_tickets.FirstOrDefault(ticket => ticket.Id == id));
    }

    public Task AddAsync(SupportTicket ticket, CancellationToken cancellationToken = default)
    {
        _tickets.Add(ticket);
        return Task.CompletedTask;
    }

    public Task UpdateAsync(SupportTicket ticket, CancellationToken cancellationToken = default)
    {
        var index = _tickets.FindIndex(item => item.Id == ticket.Id);
        if (index >= 0)
        {
            _tickets[index] = ticket;
        }

        return Task.CompletedTask;
    }
}
