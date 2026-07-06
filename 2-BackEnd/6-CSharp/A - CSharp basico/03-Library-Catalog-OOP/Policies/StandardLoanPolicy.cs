using Study.CSharp.LibraryCatalogOop.Contracts;
using Study.CSharp.LibraryCatalogOop.Models;

namespace Study.CSharp.LibraryCatalogOop.Policies;

public sealed class StandardLoanPolicy : ILoanPolicy
{
    private readonly int _defaultLoanDays;
    private readonly int _maxConcurrentLoansPerMember;

    public StandardLoanPolicy(int defaultLoanDays, int maxConcurrentLoansPerMember)
    {
        _defaultLoanDays = defaultLoanDays;
        _maxConcurrentLoansPerMember = maxConcurrentLoansPerMember;
    }

    public DateTimeOffset CalculateDueDate(DateTimeOffset borrowedAt, Member member)
    {
        return borrowedAt.AddDays(_defaultLoanDays);
    }

    public bool CanBorrowMoreBooks(Member member, IReadOnlyCollection<LoanRecord> activeLoans)
    {
        var effectiveLimit = Math.Max(1, Math.Min(member.MaxConcurrentLoans, _maxConcurrentLoansPerMember));
        return activeLoans.Count < effectiveLimit;
    }
}
