namespace Study.CSharp.TaskParallelLibrary.Bootstrap;

public sealed class TaskParallelApplication
{
    public Configuration.PipelineSettings Settings { get; }
    public Services.PipelineCoordinator Coordinator { get; }

    private TaskParallelApplication(
        Configuration.PipelineSettings settings,
        Services.PipelineCoordinator coordinator)
    {
        Settings = settings;
        Coordinator = coordinator;
    }

    public static TaskParallelApplication CreateDefault()
    {
        var settings = new Configuration.PipelineSettings();
        var source = new Services.InMemoryWorkItemSource();
        var processor = new Services.WorkItemProcessor(settings);
        var coordinator = new Services.PipelineCoordinator(settings, source, processor);
        return new TaskParallelApplication(settings, coordinator);
    }

    public async Task RunAsync()
    {
        Console.WriteLine("Task Parallel Library pipeline bootstrapped.");
        Console.WriteLine($"Batch size: {Settings.BatchSize}");
        Console.WriteLine($"Max degree of parallelism: {Settings.MaxDegreeOfParallelism}");
        Console.WriteLine($"Simulated latency: {Settings.SimulatedLatencyMs}ms");
        var summary = await Coordinator.RunAsync();
        Console.WriteLine($"Processed {summary.TotalItems} items with {summary.SuccessfulItems} successes.");
    }
}
