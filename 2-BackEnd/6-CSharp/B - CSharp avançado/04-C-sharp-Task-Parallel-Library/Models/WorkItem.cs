namespace Study.CSharp.TaskParallelLibrary.Models;

public sealed record WorkItem(
    Guid Id,
    string Input,
    string Category,
    int Priority);
