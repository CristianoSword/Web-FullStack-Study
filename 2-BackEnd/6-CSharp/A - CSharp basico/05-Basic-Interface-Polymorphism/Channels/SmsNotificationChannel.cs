using Study.CSharp.InterfacePolymorphism.Contracts;
using Study.CSharp.InterfacePolymorphism.Models;

namespace Study.CSharp.InterfacePolymorphism.Channels;

public sealed class SmsNotificationChannel : INotificationChannel
{
    public SmsNotificationChannel(bool isEnabled)
    {
        IsEnabled = isEnabled;
    }

    public ChannelKind Kind => ChannelKind.Sms;
    public bool IsEnabled { get; }

    public NotificationResult Send(NotificationRequest request)
    {
        var transportMessage = $"SMS delivered to {request.Recipient}.";
        return new NotificationResult(Kind, request.Recipient, true, transportMessage);
    }
}
