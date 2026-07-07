using Study.CSharp.InterfacePolymorphism.Contracts;
using Study.CSharp.InterfacePolymorphism.Models;

namespace Study.CSharp.InterfacePolymorphism.Services;

public sealed class InMemoryNotificationLogRepository : INotificationLogRepository
{
    private readonly List<NotificationLogEntry> _entries = new();
    private int _nextId = 1;

    public IReadOnlyCollection<NotificationLogEntry> List()
    {
        return _entries.OrderByDescending(entry => entry.SentAt).ToArray();
    }

    public void Add(NotificationLogEntry entry)
    {
        _entries.Add(entry with { Id = _nextId++ });
    }
}
