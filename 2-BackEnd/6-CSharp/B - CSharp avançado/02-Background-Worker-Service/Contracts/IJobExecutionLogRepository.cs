using Study.CSharp.BackgroundWorkerService.Models;

namespace Study.CSharp.BackgroundWorkerService.Contracts;

public interface IJobExecutionLogRepository
{
    IReadOnlyCollection<JobExecutionLogEntry> List();
    void Add(JobExecutionLogEntry entry);
}
