using Study.CSharp.BackgroundWorkerService.Contracts;
using Study.CSharp.BackgroundWorkerService.Models;

namespace Study.CSharp.BackgroundWorkerService.Handlers;

public sealed class ReportSyncHandler : IWorkerJobHandler
{
    public string Name => "report-sync";

    public async Task<JobExecutionResult> ExecuteAsync(ScheduledJobContext context, CancellationToken cancellationToken)
    {
        await Task.Delay(250, cancellationToken);
        return new JobExecutionResult(true, $"Report batch '{context.Job.Payload}' synchronized with the analytics store.");
    }
}
