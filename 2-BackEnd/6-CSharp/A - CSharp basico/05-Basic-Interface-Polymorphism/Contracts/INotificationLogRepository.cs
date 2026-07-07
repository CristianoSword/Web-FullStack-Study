using Study.CSharp.InterfacePolymorphism.Models;

namespace Study.CSharp.InterfacePolymorphism.Contracts;

public interface INotificationLogRepository
{
    IReadOnlyCollection<NotificationLogEntry> List();
    void Add(NotificationLogEntry entry);
}
