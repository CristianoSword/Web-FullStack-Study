namespace Study.CSharp.ContactBookCrud.Models;

public sealed record CreateContactInput(
    string FullName,
    string Email,
    string Phone);
