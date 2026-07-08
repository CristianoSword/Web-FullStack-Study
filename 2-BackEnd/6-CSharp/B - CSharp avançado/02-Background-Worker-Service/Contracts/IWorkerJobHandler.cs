using Study.CSharp.BackgroundWorkerService.Models;

namespace Study.CSharp.BackgroundWorkerService.Contracts;

public interface IWorkerJobHandler
{
    string Name { get; }
    Task<JobExecutionResult> ExecuteAsync(ScheduledJobContext context, CancellationToken cancellationToken);
}
