namespace Study.CSharp.TaskParallelLibrary.Models;

public sealed record ProcessedWorkItem(
    Guid Id,
    string Input,
    bool Success,
    string Output,
    TimeSpan Duration);
