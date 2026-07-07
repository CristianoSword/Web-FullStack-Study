namespace Study.CSharp.JsonConfigParser.Bootstrap;

public sealed class JsonConfigParserApplication
{
    public Configuration.RuntimeSettings Settings { get; }
    public Services.ConfigParserService ParserService { get; }

    private JsonConfigParserApplication(
        Configuration.RuntimeSettings settings,
        Services.ConfigParserService parserService)
    {
        Settings = settings;
        ParserService = parserService;
    }

    public static JsonConfigParserApplication CreateDefault()
    {
        var settings = new Configuration.RuntimeSettings();
        var fileSet = new Models.ConfigurationFileSet(
            Path.Combine(AppContext.BaseDirectory, settings.BaseFileName),
            Path.Combine(AppContext.BaseDirectory, settings.OverrideFileName),
            settings.EnvironmentName);
        var merger = new Services.JsonConfigurationMerger();
        var store = new Services.FileConfigurationStore(fileSet, merger);
        var navigator = new Services.ConfigurationNavigator();
        var parserService = new Services.ConfigParserService(store, navigator);

        return new JsonConfigParserApplication(settings, parserService);
    }

    public void Run()
    {
        Console.WriteLine("JSON Config Parser bootstrapped.");
        Console.WriteLine($"Environment: {Settings.EnvironmentName}");
        Console.WriteLine($"Base file: {Settings.BaseFileName}");
        Console.WriteLine($"Override file: {Settings.OverrideFileName}");
        var configuration = ParserService.Load();
        Console.WriteLine($"App name: {configuration.App.Name}");
        Console.WriteLine($"Server: {configuration.App.Server.Host}:{configuration.App.Server.Port}");
    }
}
