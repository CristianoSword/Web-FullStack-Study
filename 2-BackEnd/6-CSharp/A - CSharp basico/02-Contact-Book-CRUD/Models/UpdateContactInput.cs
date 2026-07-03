namespace Study.CSharp.ContactBookCrud.Models;

public sealed record UpdateContactInput(
    int Id,
    string FullName,
    string Email,
    string Phone);
