namespace Study.CSharp.InterfacePolymorphism.Bootstrap;

public sealed class InterfacePolymorphismApplication
{
    public Configuration.NotificationSettings Settings { get; }

    private InterfacePolymorphismApplication(Configuration.NotificationSettings settings)
    {
        Settings = settings;
    }

    public static InterfacePolymorphismApplication CreateDefault()
    {
        return new InterfacePolymorphismApplication(new Configuration.NotificationSettings());
    }

    public void Run()
    {
        Console.WriteLine("Interface Polymorphism bootstrapped.");
        Console.WriteLine($"Default sender: {Settings.DefaultSender}");
        Console.WriteLine($"Email enabled: {Settings.EmailEnabled}");
        Console.WriteLine($"Sms enabled: {Settings.SmsEnabled}");
        Console.WriteLine($"Slack enabled: {Settings.SlackEnabled}");
    }
}
