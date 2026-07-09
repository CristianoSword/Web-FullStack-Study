namespace Study.CSharp.CqrsMediatRPattern.Models;

public sealed record CreateTicketRequest(
    string Title,
    string Description,
    string CustomerEmail,
    string? Assignee,
    string Priority);
