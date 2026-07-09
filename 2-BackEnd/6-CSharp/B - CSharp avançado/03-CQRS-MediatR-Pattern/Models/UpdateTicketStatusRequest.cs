namespace Study.CSharp.CqrsMediatRPattern.Models;

public sealed record UpdateTicketStatusRequest(
    string Status,
    string? Assignee);
