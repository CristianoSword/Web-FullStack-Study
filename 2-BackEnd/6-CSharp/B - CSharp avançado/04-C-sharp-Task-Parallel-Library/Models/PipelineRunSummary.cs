namespace Study.CSharp.TaskParallelLibrary.Models;

public sealed record PipelineRunSummary(
    int TotalItems,
    int SuccessfulItems,
    int FailedItems,
    TimeSpan Elapsed);
