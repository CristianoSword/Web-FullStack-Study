using Study.CSharp.ContactBookCrud.Exceptions;
using Study.CSharp.ContactBookCrud.Models;
using Study.CSharp.ContactBookCrud.Services;

namespace Study.CSharp.ContactBookCrud.Cli;

public sealed class ContactConsole
{
    private readonly ContactBookService _service;

    public ContactConsole(ContactBookService service)
    {
        _service = service;
    }

    public void Run()
    {
        var running = true;

        while (running)
        {
            try
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

                if (string.Equals(input, "list", StringComparison.OrdinalIgnoreCase))
                {
                    MenuRenderer.PrintContacts(_service.ListContacts());
                    continue;
                }

                if (input.StartsWith("search ", StringComparison.OrdinalIgnoreCase))
                {
                    var query = input["search ".Length..];
                    MenuRenderer.PrintContacts(_service.SearchByName(query));
                    continue;
                }

                if (input.StartsWith("add ", StringComparison.OrdinalIgnoreCase))
                {
                    var payload = ParsePayload(input["add ".Length..], requireId: false);
                    var contact = _service.CreateContact(new CreateContactInput(payload.FullName, payload.Email, payload.Phone));
                    MenuRenderer.PrintMessage($"Created contact #{contact.Id}.");
                    continue;
                }

                if (input.StartsWith("update ", StringComparison.OrdinalIgnoreCase))
                {
                    var payload = ParsePayload(input["update ".Length..], requireId: true);
                    var contact = _service.UpdateContact(new UpdateContactInput(payload.Id, payload.FullName, payload.Email, payload.Phone));
                    MenuRenderer.PrintMessage(contact is null ? "Contact not found." : $"Updated contact #{contact.Id}.");
                    continue;
                }

                if (input.StartsWith("delete ", StringComparison.OrdinalIgnoreCase))
                {
                    if (!int.TryParse(input["delete ".Length..], out var id))
                    {
                        throw new InvalidOperationException("Use: delete <id>");
                    }

                    var deleted = _service.DeleteContact(id);
                    MenuRenderer.PrintMessage(deleted ? $"Deleted contact #{id}." : "Contact not found.");
                    continue;
                }

                MenuRenderer.PrintMessage("Unknown command. Type 'help' to see supported commands.");
            }
            catch (DomainValidationException exception)
            {
                MenuRenderer.PrintMessage($"Validation error: {exception.Message}");
            }
            catch (InvalidOperationException exception)
            {
                MenuRenderer.PrintMessage(exception.Message);
            }
        }
    }

    private static ParsedPayload ParsePayload(string content, bool requireId)
    {
        var segments = content.Split(';', StringSplitOptions.TrimEntries);
        if ((!requireId && segments.Length != 3) || (requireId && segments.Length != 4))
        {
            throw new InvalidOperationException(
                requireId
                    ? "Use: update <id>;<name>;<email>;<phone>"
                    : "Use: add <name>;<email>;<phone>");
        }

        if (requireId)
        {
            if (!int.TryParse(segments[0], out var id))
            {
                throw new InvalidOperationException("The contact id must be a positive integer.");
            }

            return new ParsedPayload(id, segments[1], segments[2], segments[3]);
        }

        return new ParsedPayload(0, segments[0], segments[1], segments[2]);
    }

    private sealed record ParsedPayload(int Id, string FullName, string Email, string Phone);
}
