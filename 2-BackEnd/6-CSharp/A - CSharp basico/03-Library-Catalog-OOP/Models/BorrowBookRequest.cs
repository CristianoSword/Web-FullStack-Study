namespace Study.CSharp.LibraryCatalogOop.Models;

public sealed record BorrowBookRequest(
    int MemberId,
    int BookId,
    DateTimeOffset BorrowedAt);
