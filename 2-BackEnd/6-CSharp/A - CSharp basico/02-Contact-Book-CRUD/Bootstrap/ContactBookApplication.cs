namespace Study.CSharp.ContactBookCrud.Bootstrap;

public sealed class ContactBookApplication
{
    public static ContactBookApplication CreateDefault()
    {
        return new ContactBookApplication();
    }

    public void Run()
    {
        Console.WriteLine("Contact Book bootstrap complete.");
        Console.WriteLine("CRUD commands will be wired in upcoming phases.");
    }
}
