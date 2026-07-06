using Study.CSharp.LibraryCatalogOop.Contracts;
using Study.CSharp.LibraryCatalogOop.Models;

namespace Study.CSharp.LibraryCatalogOop.Policies;

public sealed class StandardLoanPolicy : ILoanPolicy
{
    private readonly int _defaultLoanDays;

    public StandardLoanPolicy(int defaultLoanDays)
    {
        _defaultLoanDays = defaultLoanDays;
    }

    public DateTimeOffset CalculateDueDate(DateTimeOffset borrowedAt, Member member)
    {
        return borrowedAt.AddDays(_defaultLoanDays);
    }

    public bool CanBorrowMoreBooks(Member member, IReadOnlyCollection<LoanRecord> activeLoans)
    {
        return activeLoans.Count < member.MaxConcurrentLoans;
    }
}
