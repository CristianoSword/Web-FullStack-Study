using MediatR;
using Study.CSharp.CqrsMediatRPattern.Contracts;
using Study.CSharp.CqrsMediatRPattern.Models;
using Study.CSharp.CqrsMediatRPattern.Services;

namespace Study.CSharp.CqrsMediatRPattern.Features.Tickets.Queries.GetTicketById;

public sealed class GetTicketByIdQueryHandler : IRequestHandler<GetTicketByIdQuery, TicketResponse?>
{
    private readonly ISupportTicketRepository _repository;

    public GetTicketByIdQueryHandler(ISupportTicketRepository repository)
    {
        _repository = repository;
    }

    public async Task<TicketResponse?> Handle(GetTicketByIdQuery request, CancellationToken cancellationToken)
    {
        var ticket = await _repository.FindByIdAsync(request.TicketId, cancellationToken);
        return ticket is null ? null : TicketMapper.ToResponse(ticket);
    }
}
