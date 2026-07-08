using Study.CSharp.BackgroundWorkerService.Contracts;
using Study.CSharp.BackgroundWorkerService.Models;

namespace Study.CSharp.BackgroundWorkerService.Handlers;

public sealed class CleanupTempFilesHandler : IWorkerJobHandler
{
    public string Name => "cleanup";

    public async Task<JobExecutionResult> ExecuteAsync(ScheduledJobContext context, CancellationToken cancellationToken)
    {
        await Task.Delay(150, cancellationToken);
        return new JobExecutionResult(true, $"Temporary directory '{context.Job.Payload}' cleaned successfully.");
    }
}
