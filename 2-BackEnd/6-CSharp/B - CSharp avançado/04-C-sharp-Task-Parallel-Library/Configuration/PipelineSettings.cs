namespace Study.CSharp.TaskParallelLibrary.Configuration;

public sealed class PipelineSettings
{
    public int BatchSize { get; init; } = 5;
    public int MaxDegreeOfParallelism { get; init; } = 4;
    public int SimulatedLatencyMs { get; init; } = 120;
}
