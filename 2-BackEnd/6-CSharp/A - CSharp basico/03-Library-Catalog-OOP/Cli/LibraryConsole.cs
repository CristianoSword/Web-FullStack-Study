using Study.CSharp.LibraryCatalogOop.Models;
using Study.CSharp.LibraryCatalogOop.Services;

namespace Study.CSharp.LibraryCatalogOop.Cli;

public sealed class LibraryConsole
{
    private readonly LibraryCatalogService _catalogService;

    public LibraryConsole(LibraryCatalogService catalogService)
    {
        _catalogService = catalogService;
    }

    public void Run()
    {
        var running = true;

        while (running)
        {
            MenuRenderer.PrintPrompt();
            var input = Console.ReadLine()?.Trim() ?? string.Empty;

            if (string.Equals(input, "exit", StringComparison.OrdinalIgnoreCase))
            {
                running = false;
                continue;
            }

            if (string.Equals(input, "help", StringComparison.OrdinalIgnoreCase))
            {
                MenuRenderer.PrintHelp();
                continue;
            }

            if (string.Equals(input, "catalog", StringComparison.OrdinalIgnoreCase))
            {
                MenuRenderer.PrintBooks(_catalogService.ListBooks());
                continue;
            }

            if (string.Equals(input, "members", StringComparison.OrdinalIgnoreCase))
            {
                MenuRenderer.PrintMembers(_catalogService.ListMembers());
                continue;
            }

            if (string.Equals(input, "loans", StringComparison.OrdinalIgnoreCase))
            {
                MenuRenderer.PrintLoans(_catalogService.ListLoans());
                continue;
            }

            if (input.StartsWith("search ", StringComparison.OrdinalIgnoreCase))
            {
                var term = input["search ".Length..];
                MenuRenderer.PrintBooks(_catalogService.SearchBooks(term));
                continue;
            }

            if (input.StartsWith("borrow ", StringComparison.OrdinalIgnoreCase))
            {
                var payload = ParsePayload(input["borrow ".Length..]);
                var loan = _catalogService.BorrowBook(new BorrowBookRequest(payload.MemberId, payload.BookId, DateTimeOffset.UtcNow));
                MenuRenderer.PrintMessage($"Loan #{loan.Id} created with due date {loan.DueAt:yyyy-MM-dd}.");
                continue;
            }

            if (input.StartsWith("return ", StringComparison.OrdinalIgnoreCase))
            {
                var payload = ParsePayload(input["return ".Length..]);
                var loan = _catalogService.ReturnBook(new ReturnBookRequest(payload.MemberId, payload.BookId, DateTimeOffset.UtcNow));
                MenuRenderer.PrintMessage($"Loan #{loan.Id} closed at {loan.ReturnedAt:yyyy-MM-dd HH:mm}.");
                continue;
            }

            MenuRenderer.PrintMessage("Unknown command. Type 'help' to see supported commands.");
        }
    }

    private static CommandPayload ParsePayload(string content)
    {
        var segments = content.Split(';', StringSplitOptions.TrimEntries);
        if (segments.Length != 2)
        {
            throw new InvalidOperationException("Use: <command> <memberId>;<bookId>");
        }

        if (!int.TryParse(segments[0], out var memberId) || !int.TryParse(segments[1], out var bookId))
        {
            throw new InvalidOperationException("Member id and book id must be integers.");
        }

        return new CommandPayload(memberId, bookId);
    }

    private sealed record CommandPayload(int MemberId, int BookId);
}
