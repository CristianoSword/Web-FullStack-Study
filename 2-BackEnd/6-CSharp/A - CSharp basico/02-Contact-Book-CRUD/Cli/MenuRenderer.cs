using Study.CSharp.ContactBookCrud.Models;

namespace Study.CSharp.ContactBookCrud.Cli;

public static class MenuRenderer
{
    public static void PrintBanner()
    {
        Console.WriteLine("Contact Book CRUD");
        Console.WriteLine("Commands: list, search <name>, add, update, delete <id>, help, exit");
    }

    public static void PrintPrompt()
    {
        Console.Write("> ");
    }

    public static void PrintHelp()
    {
        Console.WriteLine("add <name>;<email>;<phone>");
        Console.WriteLine("update <id>;<name>;<email>;<phone>");
        Console.WriteLine("delete <id>");
        Console.WriteLine("search <name>");
    }

    public static void PrintContacts(IReadOnlyCollection<Contact> contacts)
    {
        if (contacts.Count == 0)
        {
            Console.WriteLine("No contacts found.");
            return;
        }

        foreach (var contact in contacts)
        {
            Console.WriteLine($"#{contact.Id} | {contact.FullName} | {contact.Email} | {contact.Phone}");
        }
    }

    public static void PrintMessage(string message)
    {
        Console.WriteLine(message);
    }
}
