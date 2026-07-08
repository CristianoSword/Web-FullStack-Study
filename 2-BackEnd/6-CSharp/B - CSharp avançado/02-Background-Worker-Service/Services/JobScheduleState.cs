using Cronos;
using Study.CSharp.BackgroundWorkerService.Models;

namespace Study.CSharp.BackgroundWorkerService.Services;

public sealed record JobScheduleState(
    WorkerJobDefinition Definition,
    CronExpression Expression,
    DateTimeOffset? LastRunAt);
