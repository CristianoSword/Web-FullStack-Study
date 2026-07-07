using Study.CSharp.InterfacePolymorphism.Contracts;
using Study.CSharp.InterfacePolymorphism.Models;

namespace Study.CSharp.InterfacePolymorphism.Services;

public sealed class NotificationDispatcher
{
    private readonly string _defaultSender;
    private readonly Dictionary<ChannelKind, INotificationChannel> _channels;
    private readonly INotificationLogRepository _logRepository;

    public NotificationDispatcher(
        string defaultSender,
        IEnumerable<INotificationChannel> channels,
        INotificationLogRepository logRepository)
    {
        _defaultSender = defaultSender;
        _channels = channels.ToDictionary(channel => channel.Kind);
        _logRepository = logRepository;
    }

    public IReadOnlyCollection<INotificationChannel> ListChannels() => _channels.Values.OrderBy(channel => channel.Kind).ToArray();

    public IReadOnlyCollection<NotificationLogEntry> ListHistory() => _logRepository.List();

    public NotificationResult Dispatch(NotificationRequest request)
    {
        if (!_channels.TryGetValue(request.Channel, out var channel))
        {
            throw new InvalidOperationException($"The channel '{request.Channel}' is not registered.");
        }

        if (!channel.IsEnabled)
        {
            throw new InvalidOperationException($"The channel '{request.Channel}' is disabled.");
        }

        var requestWithSender = string.IsNullOrWhiteSpace(request.Sender)
            ? request with { Sender = _defaultSender }
            : request;

        var result = channel.Send(requestWithSender);
        _logRepository.Add(new NotificationLogEntry(0, result.Channel, result.Recipient, request.Subject, DateTimeOffset.UtcNow, result.Success, result.TransportMessage));
        return result;
    }
}
