namespace Study.CSharp.BackgroundWorkerService.Models;

public sealed record ScheduledJobContext(
    WorkerJobDefinition Job,
    DateTimeOffset StartedAt);
