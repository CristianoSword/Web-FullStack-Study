using System.Text.Json;

namespace Study.CSharp.InterfacePolymorphism.Bootstrap;

public sealed class InterfacePolymorphismApplication
{
    public Configuration.NotificationSettings Settings { get; }
    public Services.NotificationDispatcher Dispatcher { get; }
    public Cli.NotificationConsole ConsoleUi { get; }

    private InterfacePolymorphismApplication(
        Configuration.NotificationSettings settings,
        Services.NotificationDispatcher dispatcher,
        Cli.NotificationConsole consoleUi)
    {
        Settings = settings;
        Dispatcher = dispatcher;
        ConsoleUi = consoleUi;
    }

    public static InterfacePolymorphismApplication CreateDefault()
    {
        var settings = LoadSettings();
        var logRepository = new Services.InMemoryNotificationLogRepository();
        var channels = new Contracts.INotificationChannel[]
        {
            new Channels.EmailNotificationChannel(settings.EmailEnabled),
            new Channels.SmsNotificationChannel(settings.SmsEnabled),
            new Channels.SlackNotificationChannel(settings.SlackEnabled),
        };
        var validator = new Validation.NotificationRequestValidator();
        var dispatcher = new Services.NotificationDispatcher(settings.DefaultSender, channels, logRepository, validator);
        var consoleUi = new Cli.NotificationConsole(dispatcher);

        return new InterfacePolymorphismApplication(settings, dispatcher, consoleUi);
    }

    public void Run()
    {
        Cli.MenuRenderer.PrintBanner(Settings, Dispatcher.ListChannels());
        ConsoleUi.Run();
    }

    private static Configuration.NotificationSettings LoadSettings()
    {
        var settingsPath = Path.Combine(AppContext.BaseDirectory, "appsettings.json");
        if (!File.Exists(settingsPath))
        {
            return new Configuration.NotificationSettings();
        }

        try
        {
            var json = File.ReadAllText(settingsPath);
            var document = JsonSerializer.Deserialize<AppSettingsDocument>(json);
            return document?.Notifications ?? new Configuration.NotificationSettings();
        }
        catch (IOException)
        {
            return new Configuration.NotificationSettings();
        }
        catch (JsonException)
        {
            return new Configuration.NotificationSettings();
        }
    }

    private sealed class AppSettingsDocument
    {
        public Configuration.NotificationSettings Notifications { get; init; } = new();
    }
}
