using System.Text.Json;

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
        var settings = LoadSettings();
        var repository = new Services.InMemoryContactRepository(settings.SeedContacts);
        var validator = new Validation.ContactInputValidator();
        var service = new Services.ContactBookService(repository, validator);

        return new ContactBookApplication(settings, service, new Cli.ContactConsole(service));
    }

    public void Run()
    {
        Cli.MenuRenderer.PrintBanner();
        Console.WriteLine($"Configured page size: {Settings.PageSize}");
        Console.WriteLine($"Seeded contacts: {Service.ListContacts().Count}");
        ConsoleUi.Run();
    }

    private static Configuration.ContactBookSettings LoadSettings()
    {
        var settingsPath = Path.Combine(AppContext.BaseDirectory, "appsettings.json");
        if (!File.Exists(settingsPath))
        {
            return new Configuration.ContactBookSettings();
        }

        try
        {
            var json = File.ReadAllText(settingsPath);
            var document = JsonSerializer.Deserialize<AppSettingsDocument>(json);
            return document?.ContactBook ?? new Configuration.ContactBookSettings();
        }
        catch (JsonException)
        {
            return new Configuration.ContactBookSettings();
        }
        catch (IOException)
        {
            return new Configuration.ContactBookSettings();
        }
    }

    private sealed class AppSettingsDocument
    {
        public Configuration.ContactBookSettings ContactBook { get; init; } = new();
    }
}
