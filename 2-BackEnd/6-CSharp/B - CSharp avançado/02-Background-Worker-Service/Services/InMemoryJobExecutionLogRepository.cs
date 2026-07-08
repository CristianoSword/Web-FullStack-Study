using Study.CSharp.BackgroundWorkerService.Contracts;
using Study.CSharp.BackgroundWorkerService.Models;

namespace Study.CSharp.BackgroundWorkerService.Services;

public sealed class InMemoryJobExecutionLogRepository : IJobExecutionLogRepository
{
    private readonly List<JobExecutionLogEntry> _entries = new();
    private int _nextId = 1;

    public IReadOnlyCollection<JobExecutionLogEntry> List()
    {
        return _entries.OrderByDescending(entry => entry.StartedAt).ToArray();
    }

    public void Add(JobExecutionLogEntry entry)
    {
        _entries.Add(entry with { Id = _nextId++ });
    }
}
