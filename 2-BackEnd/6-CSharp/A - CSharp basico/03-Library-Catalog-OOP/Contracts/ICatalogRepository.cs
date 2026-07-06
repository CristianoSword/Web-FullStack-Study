using Study.CSharp.LibraryCatalogOop.Models;

namespace Study.CSharp.LibraryCatalogOop.Contracts;

public interface ICatalogRepository
{
    IReadOnlyCollection<Book> ListBooks();
    IReadOnlyCollection<Member> ListMembers();
    IReadOnlyCollection<LoanRecord> ListLoans();
    Book? FindBookById(int bookId);
    Member? FindMemberById(int memberId);
    LoanRecord? FindActiveLoanByBookId(int bookId);
    IReadOnlyCollection<LoanRecord> FindActiveLoansByMemberId(int memberId);
    void SaveBook(Book book);
    void SaveLoan(LoanRecord loanRecord);
}
