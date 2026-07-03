namespace Study.CSharp.ContactBookCrud.Models;

public sealed record Contact(
    int Id,
    string FullName,
    string Email,
    string Phone,
    DateTimeOffset CreatedAt);
