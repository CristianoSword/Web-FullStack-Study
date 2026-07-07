using Study.CSharp.InterfacePolymorphism.Models;

namespace Study.CSharp.InterfacePolymorphism.Contracts;

public interface INotificationChannel
{
    ChannelKind Kind { get; }
    bool IsEnabled { get; }
    NotificationResult Send(NotificationRequest request);
}
