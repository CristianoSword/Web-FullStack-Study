namespace Study.CSharp.JsonConfigParser.Bootstrap;

public sealed class JsonConfigParserApplication
{
    public Configuration.RuntimeSettings Settings { get; }
    public Services.ConfigParserService ParserService { get; }
    public Cli.ConfigConsole ConsoleUi { get; }

    private JsonConfigParserApplication(
        Configuration.RuntimeSettings settings,
        Services.ConfigParserService parserService,
        Cli.ConfigConsole consoleUi)
    {
        Settings = settings;
        ParserService = parserService;
        ConsoleUi = consoleUi;
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
        var consoleUi = new Cli.ConfigConsole(parserService);

        return new JsonConfigParserApplication(settings, parserService, consoleUi);
    }

    public void Run()
    {
        var configuration = ParserService.Load();
        Cli.MenuRenderer.PrintBanner(Settings, configuration);
        ConsoleUi.Run();
    }
}
