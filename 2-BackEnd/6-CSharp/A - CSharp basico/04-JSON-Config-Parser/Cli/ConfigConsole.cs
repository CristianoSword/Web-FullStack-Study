using Study.CSharp.JsonConfigParser.Models;
using Study.CSharp.JsonConfigParser.Services;

namespace Study.CSharp.JsonConfigParser.Cli;

public sealed class ConfigConsole
{
    private readonly ConfigParserService _parserService;

    public ConfigConsole(ConfigParserService parserService)
    {
        _parserService = parserService;
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

            if (string.Equals(input, "show", StringComparison.OrdinalIgnoreCase))
            {
                MenuRenderer.PrintSummary(_parserService.Current());
                continue;
            }

            if (string.Equals(input, "export", StringComparison.OrdinalIgnoreCase))
            {
                MenuRenderer.PrintJson(_parserService.GetValue("App"));
                continue;
            }

            if (string.Equals(input, "reload", StringComparison.OrdinalIgnoreCase))
            {
                var configuration = _parserService.Load();
                MenuRenderer.PrintMessage($"Reloaded {configuration.Files.EnvironmentName} configuration.");
                continue;
            }

            if (input.StartsWith("get ", StringComparison.OrdinalIgnoreCase))
            {
                var path = input["get ".Length..];
                MenuRenderer.PrintJson(_parserService.GetValue(path));
                continue;
            }

            if (input.StartsWith("set ", StringComparison.OrdinalIgnoreCase))
            {
                var mutation = ParseMutation(input["set ".Length..]);
                var configuration = _parserService.SetValue(mutation);
                MenuRenderer.PrintMessage($"Updated '{mutation.Path}' in {configuration.Files.BasePath}.");
                continue;
            }

            MenuRenderer.PrintMessage("Unknown command. Type 'help' to see supported commands.");
        }
    }

    private static ConfigMutation ParseMutation(string content)
    {
        var separatorIndex = content.IndexOf(' ');
        if (separatorIndex <= 0 || separatorIndex >= content.Length - 1)
        {
            throw new InvalidOperationException("Use: set <path> <value>");
        }

        var path = content[..separatorIndex].Trim();
        var value = content[(separatorIndex + 1)..].Trim();
        return new ConfigMutation(path, value);
    }
}
