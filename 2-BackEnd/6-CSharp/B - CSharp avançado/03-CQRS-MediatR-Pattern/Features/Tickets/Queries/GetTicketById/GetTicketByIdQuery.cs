using MediatR;
using Study.CSharp.CqrsMediatRPattern.Models;

namespace Study.CSharp.CqrsMediatRPattern.Features.Tickets.Queries.GetTicketById;

public sealed record GetTicketByIdQuery(Guid TicketId) : IRequest<TicketResponse?>;
