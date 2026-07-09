using MediatR;
using Study.CSharp.CqrsMediatRPattern.Contracts;
using Study.CSharp.CqrsMediatRPattern.Models;
using Study.CSharp.CqrsMediatRPattern.Services;

namespace Study.CSharp.CqrsMediatRPattern.Features.Tickets.Queries.ListTickets;

public sealed class ListTicketsQueryHandler : IRequestHandler<ListTicketsQuery, IReadOnlyCollection<TicketResponse>>
{
    private readonly ISupportTicketRepository _repository;

    public ListTicketsQueryHandler(ISupportTicketRepository repository)
    {
        _repository = repository;
    }

    public async Task<IReadOnlyCollection<TicketResponse>> Handle(ListTicketsQuery request, CancellationToken cancellationToken)
    {
        var tickets = await _repository.ListAsync(cancellationToken);
        return tickets.Select(TicketMapper.ToResponse).ToArray();
    }
}
