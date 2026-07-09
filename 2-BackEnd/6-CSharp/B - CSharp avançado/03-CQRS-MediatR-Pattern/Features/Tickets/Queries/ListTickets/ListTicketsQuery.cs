using MediatR;
using Study.CSharp.CqrsMediatRPattern.Models;

namespace Study.CSharp.CqrsMediatRPattern.Features.Tickets.Queries.ListTickets;

public sealed record ListTicketsQuery() : IRequest<IReadOnlyCollection<TicketResponse>>;
