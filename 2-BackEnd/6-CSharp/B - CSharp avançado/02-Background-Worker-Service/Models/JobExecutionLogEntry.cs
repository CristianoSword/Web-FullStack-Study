namespace Study.CSharp.BackgroundWorkerService.Models;

public sealed record JobExecutionLogEntry(
    int Id,
    string JobName,
    string Handler,
    DateTimeOffset StartedAt,
    DateTimeOffset FinishedAt,
    bool Success,
    string Summary);
