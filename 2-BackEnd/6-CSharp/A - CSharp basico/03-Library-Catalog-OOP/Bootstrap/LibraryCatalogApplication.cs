using System.Text.Json;

namespace Study.CSharp.LibraryCatalogOop.Bootstrap;

public sealed class LibraryCatalogApplication
{
    public Configuration.LibrarySettings Settings { get; }
    public Services.LibraryCatalogService CatalogService { get; }
    public Cli.LibraryConsole ConsoleUi { get; }

    private LibraryCatalogApplication(
        Configuration.LibrarySettings settings,
        Services.LibraryCatalogService catalogService,
        Cli.LibraryConsole consoleUi)
    {
        Settings = settings;
        CatalogService = catalogService;
        ConsoleUi = consoleUi;
    }

    public static LibraryCatalogApplication CreateDefault()
    {
        var settings = LoadSettings();
        var repository = new Services.InMemoryCatalogRepository(settings.SeedData);
        var loanPolicy = new Policies.StandardLoanPolicy(settings.DefaultLoanDays, settings.MaxConcurrentLoansPerMember);
        var validator = new Validation.LibraryInputValidator();
        var catalogService = new Services.LibraryCatalogService(repository, loanPolicy, validator);
        var consoleUi = new Cli.LibraryConsole(catalogService);

        return new LibraryCatalogApplication(settings, catalogService, consoleUi);
    }

    public void Run()
    {
        Cli.MenuRenderer.PrintBanner(Settings, CatalogService.ListBooks().Count, CatalogService.ListMembers().Count);
        ConsoleUi.Run();
    }

    private static Configuration.LibrarySettings LoadSettings()
    {
        var settingsPath = Path.Combine(AppContext.BaseDirectory, "appsettings.json");
        if (!File.Exists(settingsPath))
        {
            return new Configuration.LibrarySettings();
        }

        try
        {
            var json = File.ReadAllText(settingsPath);
            var document = JsonSerializer.Deserialize<AppSettingsDocument>(json);
            return document?.Library ?? new Configuration.LibrarySettings();
        }
        catch (IOException)
        {
            return new Configuration.LibrarySettings();
        }
        catch (JsonException)
        {
            return new Configuration.LibrarySettings();
        }
    }

    private sealed class AppSettingsDocument
    {
        public Configuration.LibrarySettings Library { get; init; } = new();
    }
}
