using Study.CSharp.LibraryCatalogOop.Contracts;
using Study.CSharp.LibraryCatalogOop.Models;

namespace Study.CSharp.LibraryCatalogOop.Services;

public sealed class InMemoryCatalogRepository : ICatalogRepository
{
    private readonly List<Book> _books = new();
    private readonly List<Member> _members = new();
    private readonly List<LoanRecord> _loanRecords = new();
    private int _nextLoanId = 1;

    public InMemoryCatalogRepository(bool seedData)
    {
        if (seedData)
        {
            Seed();
        }
    }

    public IReadOnlyCollection<Book> ListBooks() => _books.OrderBy(book => book.Title).ToArray();

    public IReadOnlyCollection<Member> ListMembers() => _members.OrderBy(member => member.FullName).ToArray();

    public IReadOnlyCollection<LoanRecord> ListLoans() => _loanRecords.OrderByDescending(loan => loan.BorrowedAt).ToArray();

    public Book? FindBookById(int bookId) => _books.FirstOrDefault(book => book.Id == bookId);

    public Member? FindMemberById(int memberId) => _members.FirstOrDefault(member => member.Id == memberId);

    public LoanRecord? FindActiveLoanByBookId(int bookId)
    {
        return _loanRecords.FirstOrDefault(loan => loan.BookId == bookId && loan.IsActive);
    }

    public IReadOnlyCollection<LoanRecord> FindActiveLoansByMemberId(int memberId)
    {
        return _loanRecords
            .Where(loan => loan.MemberId == memberId && loan.IsActive)
            .OrderBy(loan => loan.DueAt)
            .ToArray();
    }

    public void SaveBook(Book book)
    {
        var index = _books.FindIndex(existing => existing.Id == book.Id);
        if (index >= 0)
        {
            _books[index] = book;
            return;
        }

        _books.Add(book);
    }

    public void SaveLoan(LoanRecord loanRecord)
    {
        var record = loanRecord.Id == 0
            ? loanRecord with { Id = _nextLoanId++ }
            : loanRecord;

        var index = _loanRecords.FindIndex(existing => existing.Id == record.Id);
        if (index >= 0)
        {
            _loanRecords[index] = record;
            return;
        }

        _loanRecords.Add(record);
    }

    private void Seed()
    {
        _books.AddRange(
        [
            new Book(1, "Domain-Driven Design", 2003, "BK-001", LibraryItemStatus.Available, "Eric Evans", "9780321125217", Genre.Technology),
            new Book(2, "Clean Code", 2008, "BK-002", LibraryItemStatus.Available, "Robert C. Martin", "9780132350884", Genre.Technology),
            new Book(3, "The Pragmatic Programmer", 1999, "BK-003", LibraryItemStatus.Available, "Andrew Hunt", "9780201616224", Genre.Technology),
            new Book(4, "Sapiens", 2011, "BK-004", LibraryItemStatus.Available, "Yuval Noah Harari", "9780062316097", Genre.History),
        ]);

        _members.AddRange(
        [
            new Member(1, "Ana Ferreira", "ana@library.dev", DateTimeOffset.UtcNow.AddMonths(-8), 3),
            new Member(2, "Caio Martins", "caio@library.dev", DateTimeOffset.UtcNow.AddMonths(-5), 2),
            new Member(3, "Livia Rocha", "livia@library.dev", DateTimeOffset.UtcNow.AddMonths(-2), 1),
        ]);
    }
}
