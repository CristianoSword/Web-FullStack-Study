namespace Study.CSharp.BackgroundWorkerService.Models;

public sealed record WorkerJobDefinition(
    string Name,
    string Cron,
    string Handler,
    string Payload);
