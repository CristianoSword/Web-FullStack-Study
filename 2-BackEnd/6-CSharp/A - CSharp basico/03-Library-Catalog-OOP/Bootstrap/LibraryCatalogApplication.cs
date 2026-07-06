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
        var settings = new Configuration.LibrarySettings();
        var repository = new Services.InMemoryCatalogRepository(settings.SeedData);
        var loanPolicy = new Policies.StandardLoanPolicy(settings.DefaultLoanDays);
        var catalogService = new Services.LibraryCatalogService(repository, loanPolicy);
        var consoleUi = new Cli.LibraryConsole(catalogService);

        return new LibraryCatalogApplication(settings, catalogService, consoleUi);
    }

    public void Run()
    {
        Cli.MenuRenderer.PrintBanner(Settings, CatalogService.ListBooks().Count, CatalogService.ListMembers().Count);
        ConsoleUi.Run();
    }
}
