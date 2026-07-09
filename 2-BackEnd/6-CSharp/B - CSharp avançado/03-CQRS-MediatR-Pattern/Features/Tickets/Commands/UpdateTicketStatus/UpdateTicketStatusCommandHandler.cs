using MediatR;
using Study.CSharp.CqrsMediatRPattern.Contracts;
using Study.CSharp.CqrsMediatRPattern.Domain;
using Study.CSharp.CqrsMediatRPattern.Models;
using Study.CSharp.CqrsMediatRPattern.Services;

namespace Study.CSharp.CqrsMediatRPattern.Features.Tickets.Commands.UpdateTicketStatus;

public sealed class UpdateTicketStatusCommandHandler : IRequestHandler<UpdateTicketStatusCommand, TicketResponse?>
{
    private readonly ISupportTicketRepository _repository;

    public UpdateTicketStatusCommandHandler(ISupportTicketRepository repository)
    {
        _repository = repository;
    }

    public async Task<TicketResponse?> Handle(UpdateTicketStatusCommand request, CancellationToken cancellationToken)
    {
        var ticket = await _repository.FindByIdAsync(request.TicketId, cancellationToken);
        if (ticket is null)
        {
            return null;
        }

        ticket.Status = Enum.Parse<TicketStatus>(request.Status, ignoreCase: true);
        if (!string.IsNullOrWhiteSpace(request.Assignee))
        {
            ticket.Assignee = request.Assignee.Trim();
        }

        ticket.UpdatedAt = DateTimeOffset.UtcNow;
        await _repository.UpdateAsync(ticket, cancellationToken);
        return TicketMapper.ToResponse(ticket);
    }
}
