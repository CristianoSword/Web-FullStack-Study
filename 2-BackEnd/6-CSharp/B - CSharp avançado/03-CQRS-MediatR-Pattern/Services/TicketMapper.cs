using Study.CSharp.CqrsMediatRPattern.Domain;
using Study.CSharp.CqrsMediatRPattern.Models;

namespace Study.CSharp.CqrsMediatRPattern.Services;

public static class TicketMapper
{
    public static TicketResponse ToResponse(SupportTicket ticket)
    {
        return new TicketResponse(
            ticket.Id,
            ticket.Title,
            ticket.Description,
            ticket.CustomerEmail,
            ticket.Assignee,
            ticket.Priority.ToString(),
            ticket.Status.ToString(),
            ticket.CreatedAt,
            ticket.UpdatedAt);
    }
}
