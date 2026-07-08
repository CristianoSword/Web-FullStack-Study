namespace Study.CSharp.BackgroundWorkerService.Configuration;

public sealed class WorkerRuntimeSettings
{
    public int PollIntervalSeconds { get; init; } = 15;
    public bool RunOnStartup { get; init; } = true;
}
