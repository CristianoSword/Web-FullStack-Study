namespace Study.CSharp.TaskParallelLibrary.Models;

public sealed record WorkBatch(
    int BatchNumber,
    IReadOnlyCollection<WorkItem> Items);
