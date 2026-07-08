namespace Study.CSharp.BackgroundWorkerService.Models;

public sealed record JobExecutionResult(
    bool Success,
    string Summary);
