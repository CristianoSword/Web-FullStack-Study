using MediatR;
using Study.CSharp.CqrsMediatRPattern.Models;

namespace Study.CSharp.CqrsMediatRPattern.Features.Tickets.Commands.UpdateTicketStatus;

public sealed record UpdateTicketStatusCommand(
    Guid TicketId,
    string Status,
    string? Assignee) : IRequest<TicketResponse?>;
