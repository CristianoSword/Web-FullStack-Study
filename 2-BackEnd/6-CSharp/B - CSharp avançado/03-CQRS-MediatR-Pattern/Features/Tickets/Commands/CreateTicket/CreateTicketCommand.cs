using MediatR;
using Study.CSharp.CqrsMediatRPattern.Models;

namespace Study.CSharp.CqrsMediatRPattern.Features.Tickets.Commands.CreateTicket;

public sealed record CreateTicketCommand(
    string Title,
    string Description,
    string CustomerEmail,
    string? Assignee,
    string Priority) : IRequest<TicketResponse>;
