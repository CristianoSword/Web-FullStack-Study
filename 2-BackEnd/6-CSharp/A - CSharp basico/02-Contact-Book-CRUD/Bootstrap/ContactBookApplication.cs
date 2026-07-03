namespace Study.CSharp.ContactBookCrud.Bootstrap;

public sealed class ContactBookApplication
{
    public Configuration.ContactBookSettings Settings { get; }

    private ContactBookApplication(Configuration.ContactBookSettings settings)
    {
        Settings = settings;
    }

    public static ContactBookApplication CreateDefault()
    {
        return new ContactBookApplication(new Configuration.ContactBookSettings());
    }

    public void Run()
    {
        Console.WriteLine("Contact Book bootstrap complete.");
        Console.WriteLine($"Configured page size: {Settings.PageSize}");
    }
}
