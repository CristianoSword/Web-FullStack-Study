namespace Study.CSharp.InterfacePolymorphism.Models;

public sealed record NotificationResult(
    ChannelKind Channel,
    string Recipient,
    bool Success,
    string TransportMessage);
