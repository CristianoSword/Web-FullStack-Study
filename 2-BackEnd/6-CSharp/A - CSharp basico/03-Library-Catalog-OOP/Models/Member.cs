namespace Study.CSharp.LibraryCatalogOop.Models;

public sealed record Member(
    int Id,
    string FullName,
    string Email,
    DateTimeOffset JoinedAt,
    int MaxConcurrentLoans);
