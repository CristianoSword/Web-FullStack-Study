using Study.CSharp.LibraryCatalogOop.Configuration;
using Study.CSharp.LibraryCatalogOop.Models;

namespace Study.CSharp.LibraryCatalogOop.Cli;

public static class MenuRenderer
{
    public static void PrintBanner(LibrarySettings settings, int bookCount, int memberCount)
    {
        Console.WriteLine("=== Library Catalog OOP ===");
        Console.WriteLine($"Seed data: {settings.SeedData}");
        Console.WriteLine($"Default loan days: {settings.DefaultLoanDays}");
        Console.WriteLine($"Max concurrent loans: {settings.MaxConcurrentLoansPerMember}");
        Console.WriteLine($"Books loaded: {bookCount}");
        Console.WriteLine($"Members loaded: {memberCount}");
        Console.WriteLine("Type 'help' to see supported commands.");
        Console.WriteLine();
    }

    public static void PrintPrompt() => Console.Write("library> ");

    public static void PrintHelp()
    {
        Console.WriteLine("Commands:");
        Console.WriteLine("  catalog");
        Console.WriteLine("  members");
        Console.WriteLine("  loans");
        Console.WriteLine("  search <term>");
        Console.WriteLine("  borrow <memberId>;<bookId>");
        Console.WriteLine("  return <memberId>;<bookId>");
        Console.WriteLine("  help");
        Console.WriteLine("  exit");
    }

    public static void PrintBooks(IReadOnlyCollection<Book> books)
    {
        if (books.Count == 0)
        {
            Console.WriteLine("No books found.");
            return;
        }

        foreach (var book in books)
        {
            Console.WriteLine(
                $"#{book.Id} | {book.Title} | {book.Author} | {book.Genre} | {book.Status} | {book.CatalogCode}");
        }
    }

    public static void PrintMembers(IReadOnlyCollection<Member> members)
    {
        if (members.Count == 0)
        {
            Console.WriteLine("No members found.");
            return;
        }

        foreach (var member in members)
        {
            Console.WriteLine(
                $"#{member.Id} | {member.FullName} | {member.Email} | limit: {member.MaxConcurrentLoans}");
        }
    }

    public static void PrintLoans(IReadOnlyCollection<LoanRecord> loans)
    {
        if (loans.Count == 0)
        {
            Console.WriteLine("No loans registered.");
            return;
        }

        foreach (var loan in loans)
        {
            var status = loan.IsActive ? "active" : "returned";
            Console.WriteLine(
                $"#{loan.Id} | member {loan.MemberId} -> book {loan.BookId} | due {loan.DueAt:yyyy-MM-dd} | {status}");
        }
    }

    public static void PrintMessage(string message)
    {
        Console.WriteLine(message);
    }
}
