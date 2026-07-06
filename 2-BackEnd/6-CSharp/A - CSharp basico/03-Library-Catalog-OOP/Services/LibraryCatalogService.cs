using Study.CSharp.LibraryCatalogOop.Contracts;
using Study.CSharp.LibraryCatalogOop.Models;

namespace Study.CSharp.LibraryCatalogOop.Services;

public sealed class LibraryCatalogService
{
    private readonly ICatalogRepository _repository;
    private readonly ILoanPolicy _loanPolicy;

    public LibraryCatalogService(ICatalogRepository repository, ILoanPolicy loanPolicy)
    {
        _repository = repository;
        _loanPolicy = loanPolicy;
    }

    public IReadOnlyCollection<Book> ListBooks() => _repository.ListBooks();

    public IReadOnlyCollection<Member> ListMembers() => _repository.ListMembers();

    public IReadOnlyCollection<LoanRecord> ListLoans() => _repository.ListLoans();

    public IReadOnlyCollection<Book> SearchBooks(string term)
    {
        return _repository
            .ListBooks()
            .Where(book =>
                book.Title.Contains(term, StringComparison.OrdinalIgnoreCase) ||
                book.Author.Contains(term, StringComparison.OrdinalIgnoreCase) ||
                book.CatalogCode.Contains(term, StringComparison.OrdinalIgnoreCase))
            .ToArray();
    }

    public LoanRecord BorrowBook(BorrowBookRequest request)
    {
        var member = _repository.FindMemberById(request.MemberId)
            ?? throw new InvalidOperationException("Member not found.");

        var book = _repository.FindBookById(request.BookId)
            ?? throw new InvalidOperationException("Book not found.");

        if (book.Status == LibraryItemStatus.Borrowed)
        {
            throw new InvalidOperationException("This book is already borrowed.");
        }

        var activeLoans = _repository.FindActiveLoansByMemberId(member.Id);
        if (!_loanPolicy.CanBorrowMoreBooks(member, activeLoans))
        {
            throw new InvalidOperationException("This member has already reached the loan limit.");
        }

        var dueDate = _loanPolicy.CalculateDueDate(request.BorrowedAt, member);
        var loanRecord = new LoanRecord(0, member.Id, book.Id, request.BorrowedAt, dueDate, null);
        _repository.SaveLoan(loanRecord);
        _repository.SaveBook(book with { Status = LibraryItemStatus.Borrowed });

        return _repository.FindActiveLoanByBookId(book.Id)
            ?? throw new InvalidOperationException("The loan could not be persisted.");
    }

    public LoanRecord ReturnBook(ReturnBookRequest request)
    {
        var loanRecord = _repository.FindActiveLoanByBookId(request.BookId)
            ?? throw new InvalidOperationException("No active loan was found for this book.");

        if (loanRecord.MemberId != request.MemberId)
        {
            throw new InvalidOperationException("This loan belongs to another member.");
        }

        var book = _repository.FindBookById(request.BookId)
            ?? throw new InvalidOperationException("Book not found.");

        var returnedRecord = loanRecord with { ReturnedAt = request.ReturnedAt };
        _repository.SaveLoan(returnedRecord);
        _repository.SaveBook(book with { Status = LibraryItemStatus.Available });
        return returnedRecord;
    }
}
