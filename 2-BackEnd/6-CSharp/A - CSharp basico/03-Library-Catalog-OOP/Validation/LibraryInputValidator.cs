using Study.CSharp.LibraryCatalogOop.Exceptions;
using Study.CSharp.LibraryCatalogOop.Models;

namespace Study.CSharp.LibraryCatalogOop.Validation;

public sealed class LibraryInputValidator
{
    public string NormalizeSearchTerm(string term)
    {
        var normalized = term.Trim();
        if (normalized.Length < 2)
        {
            throw new DomainValidationException("Search terms must contain at least 2 characters.");
        }

        return normalized;
    }

    public void ValidateBorrowRequest(BorrowBookRequest request)
    {
        ValidateIdentifiers(request.MemberId, request.BookId);
        if (request.BorrowedAt > DateTimeOffset.UtcNow.AddMinutes(5))
        {
            throw new DomainValidationException("Borrow date cannot be in the distant future.");
        }
    }

    public void ValidateReturnRequest(ReturnBookRequest request)
    {
        ValidateIdentifiers(request.MemberId, request.BookId);
        if (request.ReturnedAt > DateTimeOffset.UtcNow.AddMinutes(5))
        {
            throw new DomainValidationException("Return date cannot be in the distant future.");
        }
    }

    private static void ValidateIdentifiers(int memberId, int bookId)
    {
        if (memberId <= 0)
        {
            throw new DomainValidationException("Member id must be a positive integer.");
        }

        if (bookId <= 0)
        {
            throw new DomainValidationException("Book id must be a positive integer.");
        }
    }
}
