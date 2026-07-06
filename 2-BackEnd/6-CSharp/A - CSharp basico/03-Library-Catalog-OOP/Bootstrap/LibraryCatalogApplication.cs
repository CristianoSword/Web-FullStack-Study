namespace Study.CSharp.LibraryCatalogOop.Bootstrap;

public sealed class LibraryCatalogApplication
{
    public Configuration.LibrarySettings Settings { get; }

    private LibraryCatalogApplication(Configuration.LibrarySettings settings)
    {
        Settings = settings;
    }

    public static LibraryCatalogApplication CreateDefault()
    {
        return new LibraryCatalogApplication(new Configuration.LibrarySettings());
    }

    public void Run()
    {
        Console.WriteLine("Library Catalog OOP bootstrapped.");
        Console.WriteLine($"Seed data: {Settings.SeedData}");
        Console.WriteLine($"Default loan days: {Settings.DefaultLoanDays}");
        Console.WriteLine($"Max concurrent loans: {Settings.MaxConcurrentLoansPerMember}");
    }
}
