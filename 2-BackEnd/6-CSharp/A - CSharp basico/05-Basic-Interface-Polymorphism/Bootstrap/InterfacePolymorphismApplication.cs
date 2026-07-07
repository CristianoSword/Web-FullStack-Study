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
        var settings = new Configuration.NotificationSettings();
        var logRepository = new Services.InMemoryNotificationLogRepository();
        var channels = new Contracts.INotificationChannel[]
        {
            new Channels.EmailNotificationChannel(settings.EmailEnabled),
            new Channels.SmsNotificationChannel(settings.SmsEnabled),
            new Channels.SlackNotificationChannel(settings.SlackEnabled),
        };
        var dispatcher = new Services.NotificationDispatcher(settings.DefaultSender, channels, logRepository);
        var consoleUi = new Cli.NotificationConsole(dispatcher);

        return new InterfacePolymorphismApplication(settings, dispatcher, consoleUi);
    }

    public void Run()
    {
        Cli.MenuRenderer.PrintBanner(Settings, Dispatcher.ListChannels());
        ConsoleUi.Run();
    }
}
