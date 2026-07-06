namespace Study.CSharp.LibraryCatalogOop.Configuration;

public sealed class LibrarySettings
{
    public bool SeedData { get; init; } = true;
    public int DefaultLoanDays { get; init; } = 14;
    public int MaxConcurrentLoansPerMember { get; init; } = 3;
}
