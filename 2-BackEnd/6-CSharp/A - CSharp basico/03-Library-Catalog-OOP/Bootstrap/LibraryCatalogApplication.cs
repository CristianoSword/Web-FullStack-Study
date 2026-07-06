namespace Study.CSharp.LibraryCatalogOop.Bootstrap;

public sealed class LibraryCatalogApplication
{
    public Configuration.LibrarySettings Settings { get; }
    public Services.LibraryCatalogService CatalogService { get; }

    private LibraryCatalogApplication(
        Configuration.LibrarySettings settings,
        Services.LibraryCatalogService catalogService)
    {
        Settings = settings;
        CatalogService = catalogService;
    }

    public static LibraryCatalogApplication CreateDefault()
    {
        var settings = new Configuration.LibrarySettings();
        var repository = new Services.InMemoryCatalogRepository(settings.SeedData);
        var loanPolicy = new Policies.StandardLoanPolicy(settings.DefaultLoanDays);
        var catalogService = new Services.LibraryCatalogService(repository, loanPolicy);

        return new LibraryCatalogApplication(settings, catalogService);
    }

    public void Run()
    {
        Console.WriteLine("Library Catalog OOP bootstrapped.");
        Console.WriteLine($"Seed data: {Settings.SeedData}");
        Console.WriteLine($"Default loan days: {Settings.DefaultLoanDays}");
        Console.WriteLine($"Max concurrent loans: {Settings.MaxConcurrentLoansPerMember}");
        Console.WriteLine($"Books loaded: {CatalogService.ListBooks().Count}");
        Console.WriteLine($"Members loaded: {CatalogService.ListMembers().Count}");
    }
}
