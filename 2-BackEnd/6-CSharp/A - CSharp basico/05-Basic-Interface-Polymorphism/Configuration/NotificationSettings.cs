namespace Study.CSharp.InterfacePolymorphism.Configuration;

public sealed class NotificationSettings
{
    public string DefaultSender { get; init; } = "study-bot";
    public bool EmailEnabled { get; init; } = true;
    public bool SmsEnabled { get; init; } = true;
    public bool SlackEnabled { get; init; } = true;
}
