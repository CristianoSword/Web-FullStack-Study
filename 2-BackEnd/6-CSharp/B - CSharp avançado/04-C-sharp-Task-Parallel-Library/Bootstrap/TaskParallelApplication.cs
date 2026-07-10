namespace Study.CSharp.TaskParallelLibrary.Bootstrap;

public sealed class TaskParallelApplication
{
    public Configuration.PipelineSettings Settings { get; }

    private TaskParallelApplication(Configuration.PipelineSettings settings)
    {
        Settings = settings;
    }

    public static TaskParallelApplication CreateDefault()
    {
        return new TaskParallelApplication(new Configuration.PipelineSettings());
    }

    public Task RunAsync()
    {
        Console.WriteLine("Task Parallel Library pipeline bootstrapped.");
        Console.WriteLine($"Batch size: {Settings.BatchSize}");
        Console.WriteLine($"Max degree of parallelism: {Settings.MaxDegreeOfParallelism}");
        Console.WriteLine($"Simulated latency: {Settings.SimulatedLatencyMs}ms");
        return Task.CompletedTask;
    }
}
