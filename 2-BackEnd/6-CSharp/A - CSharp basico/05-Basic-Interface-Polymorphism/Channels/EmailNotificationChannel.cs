using Study.CSharp.InterfacePolymorphism.Contracts;
using Study.CSharp.InterfacePolymorphism.Models;

namespace Study.CSharp.InterfacePolymorphism.Channels;

public sealed class EmailNotificationChannel : INotificationChannel
{
    public EmailNotificationChannel(bool isEnabled)
    {
        IsEnabled = isEnabled;
    }

    public ChannelKind Kind => ChannelKind.Email;
    public bool IsEnabled { get; }

    public NotificationResult Send(NotificationRequest request)
    {
        var transportMessage = $"Email queued to {request.Recipient} with subject '{request.Subject}'.";
        return new NotificationResult(Kind, request.Recipient, true, transportMessage);
    }
}
