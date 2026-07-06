namespace Study.CSharp.ContactBookCrud.Bootstrap;

public sealed class ContactBookApplication
{
    public Configuration.ContactBookSettings Settings { get; }
    public Services.ContactBookService Service { get; }

    private ContactBookApplication(
        Configuration.ContactBookSettings settings,
        Services.ContactBookService service)
    {
        Settings = settings;
        Service = service;
    }

    public static ContactBookApplication CreateDefault()
    {
        var settings = new Configuration.ContactBookSettings();
        var repository = new Services.InMemoryContactRepository(settings.SeedContacts);
        var service = new Services.ContactBookService(repository);

        return new ContactBookApplication(settings, service);
    }

    public void Run()
    {
        Console.WriteLine("Contact Book bootstrap complete.");
        Console.WriteLine($"Configured page size: {Settings.PageSize}");
        Console.WriteLine($"Seeded contacts: {Service.ListContacts().Count}");
    }
}
