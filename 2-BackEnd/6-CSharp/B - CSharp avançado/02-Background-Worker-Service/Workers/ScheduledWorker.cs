using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace Study.CSharp.BackgroundWorkerService.Workers;

public sealed class ScheduledWorker : BackgroundService
{
    private readonly ILogger<ScheduledWorker> _logger;

    public ScheduledWorker(ILogger<ScheduledWorker> logger)
    {
        _logger = logger;
    }

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        _logger.LogInformation("Scheduled worker bootstrapped.");

        while (!stoppingToken.IsCancellationRequested)
        {
            _logger.LogInformation("Worker heartbeat at {Timestamp}.", DateTimeOffset.UtcNow);
            await Task.Delay(TimeSpan.FromSeconds(30), stoppingToken);
        }
    }
}
