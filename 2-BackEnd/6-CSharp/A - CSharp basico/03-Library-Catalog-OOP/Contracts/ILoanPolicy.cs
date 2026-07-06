using Study.CSharp.LibraryCatalogOop.Models;

namespace Study.CSharp.LibraryCatalogOop.Contracts;

public interface ILoanPolicy
{
    DateTimeOffset CalculateDueDate(DateTimeOffset borrowedAt, Member member);
    bool CanBorrowMoreBooks(Member member, IReadOnlyCollection<LoanRecord> activeLoans);
}
