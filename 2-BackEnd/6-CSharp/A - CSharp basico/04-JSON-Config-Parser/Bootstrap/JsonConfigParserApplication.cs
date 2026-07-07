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
        var settings = LoadSettings();
        var fileSet = new Models.ConfigurationFileSet(
            Path.Combine(AppContext.BaseDirectory, settings.BaseFileName),
            Path.Combine(AppContext.BaseDirectory, settings.OverrideFileName),
            settings.EnvironmentName);
        var merger = new Services.JsonConfigurationMerger();
        var binder = new Services.ConfigurationBinder();
        var store = new Services.FileConfigurationStore(fileSet, merger, binder);
        var navigator = new Services.ConfigurationNavigator();
        var validator = new Validation.ConfigurationValidator();
        var parserService = new Services.ConfigParserService(store, navigator, validator, merger, binder);
        var consoleUi = new Cli.ConfigConsole(parserService);

        return new JsonConfigParserApplication(settings, parserService, consoleUi);
    }

    public void Run()
    {
        var configuration = ParserService.Load();
        Cli.MenuRenderer.PrintBanner(Settings, configuration);
        ConsoleUi.Run();
    }

    private static Configuration.RuntimeSettings LoadSettings()
    {
        var environmentName = Environment.GetEnvironmentVariable("JSON_CONFIG_ENVIRONMENT");
        var effectiveEnvironment = string.IsNullOrWhiteSpace(environmentName)
            ? "Development"
            : environmentName.Trim();

        return new Configuration.RuntimeSettings
        {
            EnvironmentName = effectiveEnvironment,
            BaseFileName = "appsettings.json",
            OverrideFileName = $"appsettings.{effectiveEnvironment}.json",
        };
    }
}
