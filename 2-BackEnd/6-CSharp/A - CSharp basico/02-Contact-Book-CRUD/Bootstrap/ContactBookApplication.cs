namespace Study.CSharp.ContactBookCrud.Bootstrap;

public sealed class ContactBookApplication
{
    public Configuration.ContactBookSettings Settings { get; }
    public Services.ContactBookService Service { get; }
    public Cli.ContactConsole ConsoleUi { get; }

    private ContactBookApplication(
        Configuration.ContactBookSettings settings,
        Services.ContactBookService service,
        Cli.ContactConsole consoleUi)
    {
        Settings = settings;
        Service = service;
        ConsoleUi = consoleUi;
    }

    public static ContactBookApplication CreateDefault()
    {
        var settings = new Configuration.ContactBookSettings();
        var repository = new Services.InMemoryContactRepository(settings.SeedContacts);
        var service = new Services.ContactBookService(repository);

        return new ContactBookApplication(settings, service, new Cli.ContactConsole(service));
    }

    public void Run()
    {
        Cli.MenuRenderer.PrintBanner();
        Console.WriteLine($"Configured page size: {Settings.PageSize}");
        Console.WriteLine($"Seeded contacts: {Service.ListContacts().Count}");
        ConsoleUi.Run();
    }
}
