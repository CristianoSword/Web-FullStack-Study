using Study.CSharp.TaskParallelLibrary.Exceptions;
using Study.CSharp.TaskParallelLibrary.Services;

namespace Study.CSharp.TaskParallelLibrary.Cli;

public sealed class PipelineConsole
{
    private readonly PipelineCoordinator _coordinator;

    public PipelineConsole(PipelineCoordinator coordinator)
    {
        _coordinator = coordinator;
    }

    public async Task RunAsync()
    {
        var running = true;

        while (running)
        {
            MenuRenderer.PrintPrompt();
            var input = Console.ReadLine()?.Trim() ?? string.Empty;

            switch (input.ToLowerInvariant())
            {
                case "exit":
                    running = false;
                    break;
                case "help":
                    MenuRenderer.PrintHelp();
                    break;
                case "preview":
                    MenuRenderer.PrintItems(await _coordinator.LoadPreviewAsync());
                    break;
                case "sample":
                    MenuRenderer.PrintResults(await _coordinator.RunSampleAsync());
                    break;
                case "run":
                    try
                    {
                        MenuRenderer.PrintSummary(await _coordinator.RunAsync());
                    }
                    catch (DomainValidationException exception)
                    {
                        Console.WriteLine($"Validation error: {exception.Message}");
                    }
                    break;
                default:
                    Console.WriteLine("Unknown command. Type 'help' to see supported commands.");
                    break;
            }
        }
    }
}
