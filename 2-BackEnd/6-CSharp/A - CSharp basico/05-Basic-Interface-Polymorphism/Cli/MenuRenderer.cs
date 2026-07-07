using Study.CSharp.InterfacePolymorphism.Configuration;
using Study.CSharp.InterfacePolymorphism.Contracts;
using Study.CSharp.InterfacePolymorphism.Models;

namespace Study.CSharp.InterfacePolymorphism.Cli;

public static class MenuRenderer
{
    public static void PrintBanner(NotificationSettings settings, IReadOnlyCollection<INotificationChannel> channels)
    {
        Console.WriteLine("=== Interface Polymorphism ===");
        Console.WriteLine($"Default sender: {settings.DefaultSender}");
        Console.WriteLine($"Registered channels: {channels.Count}");
        Console.WriteLine("Type 'help' to see supported commands.");
        Console.WriteLine();
    }

    public static void PrintPrompt() => Console.Write("notify> ");

    public static void PrintHelp()
    {
        Console.WriteLine("Commands:");
        Console.WriteLine("  channels");
        Console.WriteLine("  history");
        Console.WriteLine("  send <channel>;<recipient>;<subject>;<body>");
        Console.WriteLine("  help");
        Console.WriteLine("  exit");
    }

    public static void PrintChannels(IReadOnlyCollection<INotificationChannel> channels)
    {
        foreach (var channel in channels)
        {
            Console.WriteLine($"{channel.Kind} | enabled: {channel.IsEnabled}");
        }
    }

    public static void PrintHistory(IReadOnlyCollection<NotificationLogEntry> entries)
    {
        if (entries.Count == 0)
        {
            Console.WriteLine("No notifications were sent yet.");
            return;
        }

        foreach (var entry in entries)
        {
            Console.WriteLine(
                $"#{entry.Id} | {entry.Channel} | {entry.Recipient} | {entry.Subject} | {entry.SentAt:yyyy-MM-dd HH:mm}");
        }
    }

    public static void PrintMessage(string message)
    {
        Console.WriteLine(message);
    }
}
