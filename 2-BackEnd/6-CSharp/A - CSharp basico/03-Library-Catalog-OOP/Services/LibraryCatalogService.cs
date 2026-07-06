using Study.CSharp.LibraryCatalogOop.Contracts;
using Study.CSharp.LibraryCatalogOop.Exceptions;
using Study.CSharp.LibraryCatalogOop.Models;
using Study.CSharp.LibraryCatalogOop.Validation;

namespace Study.CSharp.LibraryCatalogOop.Services;

public sealed class LibraryCatalogService
{
    private readonly ICatalogRepository _repository;
    private readonly ILoanPolicy _loanPolicy;
    private readonly LibraryInputValidator _validator;

    public LibraryCatalogService(
        ICatalogRepository repository,
        ILoanPolicy loanPolicy,
        LibraryInputValidator validator)
    {
        _repository = repository;
        _loanPolicy = loanPolicy;
        _validator = validator;
    }

    public IReadOnlyCollection<Book> ListBooks() => _repository.ListBooks();

    public IReadOnlyCollection<Member> ListMembers() => _repository.ListMembers();

    public IReadOnlyCollection<LoanRecord> ListLoans() => _repository.ListLoans();

    public IReadOnlyCollection<Book> SearchBooks(string term)
    {
        var normalizedTerm = _validator.NormalizeSearchTerm(term);

        return _repository
            .ListBooks()
            .Where(book =>
                book.Title.Contains(normalizedTerm, StringComparison.OrdinalIgnoreCase) ||
                book.Author.Contains(normalizedTerm, StringComparison.OrdinalIgnoreCase) ||
                book.CatalogCode.Contains(normalizedTerm, StringComparison.OrdinalIgnoreCase))
            .ToArray();
    }

    public LoanRecord BorrowBook(BorrowBookRequest request)
    {
        _validator.ValidateBorrowRequest(request);

        var member = _repository.FindMemberById(request.MemberId)
            ?? throw new InvalidOperationException("Member not found.");

        var book = _repository.FindBookById(request.BookId)
            ?? throw new InvalidOperationException("Book not found.");

        if (book.Status == LibraryItemStatus.Borrowed || _repository.FindActiveLoanByBookId(book.Id) is not null)
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
        _validator.ValidateReturnRequest(request);

        var loanRecord = _repository.FindActiveLoanByBookId(request.BookId)
            ?? throw new InvalidOperationException("No active loan was found for this book.");

        if (loanRecord.MemberId != request.MemberId)
        {
            throw new InvalidOperationException("This loan belongs to another member.");
        }

        if (request.ReturnedAt < loanRecord.BorrowedAt)
        {
            throw new DomainValidationException("The return date cannot be earlier than the borrow date.");
        }

        var book = _repository.FindBookById(request.BookId)
            ?? throw new InvalidOperationException("Book not found.");

        var returnedRecord = loanRecord with { ReturnedAt = request.ReturnedAt };
        _repository.SaveLoan(returnedRecord);
        _repository.SaveBook(book with { Status = LibraryItemStatus.Available });
        return returnedRecord;
    }
}
