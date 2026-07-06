namespace Study.CSharp.LibraryCatalogOop.Models;

public sealed record LoanRecord(
    int Id,
    int MemberId,
    int BookId,
    DateTimeOffset BorrowedAt,
    DateTimeOffset DueAt,
    DateTimeOffset? ReturnedAt)
{
    public bool IsReturned => ReturnedAt.HasValue;
    public bool IsActive => !IsReturned;
}
