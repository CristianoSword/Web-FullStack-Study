namespace Study.CSharp.InterfacePolymorphism.Bootstrap;

public sealed class InterfacePolymorphismApplication
{
    public Configuration.NotificationSettings Settings { get; }
    public Services.NotificationDispatcher Dispatcher { get; }

    private InterfacePolymorphismApplication(
        Configuration.NotificationSettings settings,
        Services.NotificationDispatcher dispatcher)
    {
        Settings = settings;
        Dispatcher = dispatcher;
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

        return new InterfacePolymorphismApplication(settings, dispatcher);
    }

    public void Run()
    {
        Console.WriteLine("Interface Polymorphism bootstrapped.");
        Console.WriteLine($"Default sender: {Settings.DefaultSender}");
        Console.WriteLine($"Email enabled: {Settings.EmailEnabled}");
        Console.WriteLine($"Sms enabled: {Settings.SmsEnabled}");
        Console.WriteLine($"Slack enabled: {Settings.SlackEnabled}");
        Console.WriteLine($"Channels registered: {Dispatcher.ListChannels().Count}");
    }
}
