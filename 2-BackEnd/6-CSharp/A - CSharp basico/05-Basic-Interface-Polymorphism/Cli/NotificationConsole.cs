using Study.CSharp.InterfacePolymorphism.Models;
using Study.CSharp.InterfacePolymorphism.Services;

namespace Study.CSharp.InterfacePolymorphism.Cli;

public sealed class NotificationConsole
{
    private readonly NotificationDispatcher _dispatcher;

    public NotificationConsole(NotificationDispatcher dispatcher)
    {
        _dispatcher = dispatcher;
    }

    public void Run()
    {
        var running = true;

        while (running)
        {
            MenuRenderer.PrintPrompt();
            var input = Console.ReadLine()?.Trim() ?? string.Empty;

            if (string.Equals(input, "exit", StringComparison.OrdinalIgnoreCase))
            {
                running = false;
                continue;
            }

            if (string.Equals(input, "help", StringComparison.OrdinalIgnoreCase))
            {
                MenuRenderer.PrintHelp();
                continue;
            }

            if (string.Equals(input, "channels", StringComparison.OrdinalIgnoreCase))
            {
                MenuRenderer.PrintChannels(_dispatcher.ListChannels());
                continue;
            }

            if (string.Equals(input, "history", StringComparison.OrdinalIgnoreCase))
            {
                MenuRenderer.PrintHistory(_dispatcher.ListHistory());
                continue;
            }

            if (input.StartsWith("send ", StringComparison.OrdinalIgnoreCase))
            {
                var request = ParseRequest(input["send ".Length..]);
                var result = _dispatcher.Dispatch(request);
                MenuRenderer.PrintMessage(result.TransportMessage);
                continue;
            }

            MenuRenderer.PrintMessage("Unknown command. Type 'help' to see supported commands.");
        }
    }

    private static NotificationRequest ParseRequest(string content)
    {
        var segments = content.Split(';', StringSplitOptions.TrimEntries);
        if (segments.Length != 4)
        {
            throw new InvalidOperationException("Use: send <channel>;<recipient>;<subject>;<body>");
        }

        if (!Enum.TryParse<ChannelKind>(segments[0], true, out var channel))
        {
            throw new InvalidOperationException("Channel must be one of: Email, Sms, Slack.");
        }

        return new NotificationRequest(channel, string.Empty, segments[1], segments[2], segments[3]);
    }
}
