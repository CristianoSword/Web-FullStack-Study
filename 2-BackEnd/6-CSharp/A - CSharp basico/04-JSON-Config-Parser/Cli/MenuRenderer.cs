using Study.CSharp.JsonConfigParser.Configuration;
using Study.CSharp.JsonConfigParser.Models;

namespace Study.CSharp.JsonConfigParser.Cli;

public static class MenuRenderer
{
    public static void PrintBanner(RuntimeSettings settings, ParsedConfiguration configuration)
    {
        Console.WriteLine("=== JSON Config Parser ===");
        Console.WriteLine($"Environment: {settings.EnvironmentName}");
        Console.WriteLine($"Base file: {settings.BaseFileName}");
        Console.WriteLine($"Override file: {settings.OverrideFileName}");
        Console.WriteLine($"Loaded app: {configuration.App.Name}");
        Console.WriteLine($"Server: {configuration.App.Server.Host}:{configuration.App.Server.Port}");
        Console.WriteLine("Type 'help' to see supported commands.");
        Console.WriteLine();
    }

    public static void PrintPrompt() => Console.Write("config> ");

    public static void PrintHelp()
    {
        Console.WriteLine("Commands:");
        Console.WriteLine("  show");
        Console.WriteLine("  export");
        Console.WriteLine("  reload");
        Console.WriteLine("  get <path>");
        Console.WriteLine("  set <path> <value>");
        Console.WriteLine("  help");
        Console.WriteLine("  exit");
    }

    public static void PrintSummary(ParsedConfiguration configuration)
    {
        Console.WriteLine($"App name: {configuration.App.Name}");
        Console.WriteLine($"Environment: {configuration.App.Environment}");
        Console.WriteLine($"Server: {configuration.App.Server.Host}:{configuration.App.Server.Port}");
        Console.WriteLine($"Database provider: {configuration.App.Database.Provider}");
        Console.WriteLine($"Cache enabled: {configuration.App.Cache.Enabled}");
        Console.WriteLine($"Cache duration: {configuration.App.Cache.DurationSeconds}");
        Console.WriteLine($"Analytics flag: {configuration.App.FeatureFlags.EnableAnalytics}");
        Console.WriteLine($"Verbose logging: {configuration.App.FeatureFlags.EnableVerboseLogging}");
    }

    public static void PrintJson(string json)
    {
        Console.WriteLine(json);
    }

    public static void PrintMessage(string message)
    {
        Console.WriteLine(message);
    }
}
