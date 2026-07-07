namespace Study.CSharp.InterfacePolymorphism.Models;

public sealed record NotificationLogEntry(
    int Id,
    ChannelKind Channel,
    string Recipient,
    string Subject,
    DateTimeOffset SentAt,
    bool Success,
    string TransportMessage);
