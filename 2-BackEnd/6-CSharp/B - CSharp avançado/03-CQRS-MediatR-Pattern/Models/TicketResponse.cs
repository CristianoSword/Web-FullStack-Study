namespace Study.CSharp.CqrsMediatRPattern.Models;

public sealed record TicketResponse(
    Guid Id,
    string Title,
    string Description,
    string CustomerEmail,
    string Assignee,
    string Priority,
    string Status,
    DateTimeOffset CreatedAt,
    DateTimeOffset UpdatedAt);
