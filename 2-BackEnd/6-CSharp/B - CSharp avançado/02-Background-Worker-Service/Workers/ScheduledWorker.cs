using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace Study.CSharp.BackgroundWorkerService.Workers;

public sealed class ScheduledWorker : BackgroundService
{
    private readonly ILogger<ScheduledWorker> _logger;
    private readonly Services.JobScheduler _scheduler;

    public ScheduledWorker(
        ILogger<ScheduledWorker> logger,
        Services.JobScheduler scheduler)
    {
        _logger = logger;
        _scheduler = scheduler;
    }

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        _logger.LogInformation("Scheduled worker bootstrapped.");

        while (!stoppingToken.IsCancellationRequested)
        {
            var executed = await _scheduler.RunPendingJobsAsync(DateTimeOffset.UtcNow, stoppingToken);
            foreach (var entry in executed)
            {
                _logger.LogInformation(
                    "Job {JobName} finished with success {Success}: {Summary}",
                    entry.JobName,
                    entry.Success,
                    entry.Summary);
            }

            await Task.Delay(TimeSpan.FromSeconds(_scheduler.PollIntervalSeconds), stoppingToken);
        }
    }
}
