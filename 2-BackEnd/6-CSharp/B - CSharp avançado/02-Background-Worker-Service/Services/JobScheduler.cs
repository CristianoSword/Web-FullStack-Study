using Cronos;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Study.CSharp.BackgroundWorkerService.Configuration;
using Study.CSharp.BackgroundWorkerService.Contracts;
using Study.CSharp.BackgroundWorkerService.Models;

namespace Study.CSharp.BackgroundWorkerService.Services;

public sealed class JobScheduler
{
    private readonly WorkerRuntimeSettings _settings;
    private readonly IReadOnlyDictionary<string, IWorkerJobHandler> _handlers;
    private readonly IJobExecutionLogRepository _logRepository;
    private readonly ILogger<JobScheduler> _logger;
    private readonly List<JobScheduleState> _states;

    public JobScheduler(
        IOptions<WorkerRuntimeSettings> settings,
        IEnumerable<IWorkerJobHandler> handlers,
        IJobExecutionLogRepository logRepository,
        ILogger<JobScheduler> logger)
    {
        _settings = settings.Value;
        _handlers = handlers.ToDictionary(handler => handler.Name, StringComparer.OrdinalIgnoreCase);
        _logRepository = logRepository;
        _logger = logger;
        _states = _settings.Jobs
            .Select(job => new JobScheduleState(job, CronExpression.Parse(job.Cron), null))
            .ToList();
    }

    public int PollIntervalSeconds => _settings.PollIntervalSeconds;
    public bool RunOnStartup => _settings.RunOnStartup;

    public IReadOnlyCollection<JobExecutionLogEntry> ListHistory() => _logRepository.List();

    public IReadOnlyCollection<WorkerJobDefinition> ListJobs() => _states.Select(state => state.Definition).ToArray();

    public async Task<IReadOnlyCollection<JobExecutionLogEntry>> RunPendingJobsAsync(DateTimeOffset currentTime, CancellationToken cancellationToken)
    {
        var executed = new List<JobExecutionLogEntry>();

        for (var index = 0; index < _states.Count; index++)
        {
            var state = _states[index];
            var shouldRun = ShouldRun(state, currentTime);
            if (!shouldRun)
            {
                continue;
            }

            var result = await ExecuteAsync(state.Definition, currentTime, cancellationToken);
            executed.Add(result);
            _states[index] = state with { LastRunAt = currentTime };
        }

        return executed;
    }

    public async Task<JobExecutionLogEntry> RunJobNowAsync(string jobName, CancellationToken cancellationToken)
    {
        var state = _states.FirstOrDefault(item => string.Equals(item.Definition.Name, jobName, StringComparison.OrdinalIgnoreCase))
            ?? throw new InvalidOperationException($"The job '{jobName}' is not configured.");

        var executed = await ExecuteAsync(state.Definition, DateTimeOffset.UtcNow, cancellationToken);
        return executed;
    }

    private bool ShouldRun(JobScheduleState state, DateTimeOffset currentTime)
    {
        if (state.LastRunAt is null)
        {
            return RunOnStartup;
        }

        var nextOccurrence = state.Expression.GetNextOccurrence(state.LastRunAt.Value.UtcDateTime, TimeZoneInfo.Utc, inclusive: false);
        return nextOccurrence.HasValue && nextOccurrence.Value <= currentTime.UtcDateTime;
    }

    private async Task<JobExecutionLogEntry> ExecuteAsync(
        WorkerJobDefinition definition,
        DateTimeOffset startedAt,
        CancellationToken cancellationToken)
    {
        if (!_handlers.TryGetValue(definition.Handler, out var handler))
        {
            throw new InvalidOperationException($"No handler was registered for '{definition.Handler}'.");
        }

        var context = new ScheduledJobContext(definition, startedAt);
        _logger.LogInformation("Executing job {JobName} with handler {Handler}.", definition.Name, definition.Handler);
        var result = await handler.ExecuteAsync(context, cancellationToken);
        var entry = new JobExecutionLogEntry(0, definition.Name, definition.Handler, startedAt, DateTimeOffset.UtcNow, result.Success, result.Summary);
        _logRepository.Add(entry);
        return entry;
    }
}
