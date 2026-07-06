namespace Study.CSharp.LibraryCatalogOop.Models;

public sealed record ReturnBookRequest(
    int MemberId,
    int BookId,
    DateTimeOffset ReturnedAt);
