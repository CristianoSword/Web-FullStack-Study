using Study.CSharp.InterfacePolymorphism.Contracts;
using Study.CSharp.InterfacePolymorphism.Models;

namespace Study.CSharp.InterfacePolymorphism.Channels;

public sealed class SlackNotificationChannel : INotificationChannel
{
    public SlackNotificationChannel(bool isEnabled)
    {
        IsEnabled = isEnabled;
    }

    public ChannelKind Kind => ChannelKind.Slack;
    public bool IsEnabled { get; }

    public NotificationResult Send(NotificationRequest request)
    {
        var transportMessage = $"Slack message posted to {request.Recipient}.";
        return new NotificationResult(Kind, request.Recipient, true, transportMessage);
    }
}
