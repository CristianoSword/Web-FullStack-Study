namespace Study.CSharp.InterfacePolymorphism.Models;

public sealed record NotificationRequest(
    ChannelKind Channel,
    string Sender,
    string Recipient,
    string Subject,
    string Body);
