using Study.CSharp.TaskParallelLibrary.Configuration;
using Study.CSharp.TaskParallelLibrary.Models;

namespace Study.CSharp.TaskParallelLibrary.Cli;

public static class MenuRenderer
{
    public static void PrintBanner(PipelineSettings settings)
    {
        Console.WriteLine("=== Task Parallel Library Pipeline ===");
        Console.WriteLine($"Batch size: {settings.BatchSize}");
        Console.WriteLine($"Parallelism: {settings.MaxDegreeOfParallelism}");
        Console.WriteLine($"Latency: {settings.SimulatedLatencyMs}ms");
        Console.WriteLine("Type 'help' to see supported commands.");
        Console.WriteLine();
    }

    public static void PrintPrompt() => Console.Write("tpl> ");

    public static void PrintHelp()
    {
        Console.WriteLine("Commands:");
        Console.WriteLine("  run");
        Console.WriteLine("  preview");
        Console.WriteLine("  sample");
        Console.WriteLine("  help");
        Console.WriteLine("  exit");
    }

    public static void PrintSummary(PipelineRunSummary summary)
    {
        Console.WriteLine(
            $"Processed {summary.TotalItems} items | success: {summary.SuccessfulItems} | failed: {summary.FailedItems} | elapsed: {summary.Elapsed.TotalMilliseconds:F0}ms");
    }

    public static void PrintItems(IReadOnlyCollection<WorkItem> items)
    {
        foreach (var item in items)
        {
            Console.WriteLine($"{item.Input} | {item.Category} | priority {item.Priority}");
        }
    }

    public static void PrintResults(IReadOnlyCollection<ProcessedWorkItem> items)
    {
        foreach (var item in items)
        {
            Console.WriteLine($"{item.Input} => {item.Output} | success: {item.Success} | {item.Duration.TotalMilliseconds:F0}ms");
        }
    }
}
