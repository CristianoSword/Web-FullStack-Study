using Study.CSharp.BackgroundWorkerService.Services;

namespace Study.CSharp.BackgroundWorkerService.Cli;

public sealed class WorkerCommandRouter
{
    private readonly JobScheduler _scheduler;

    public WorkerCommandRouter(JobScheduler scheduler)
    {
        _scheduler = scheduler;
    }

    public async Task<bool> TryHandleAsync(string[] args, CancellationToken cancellationToken)
    {
        if (args.Length == 0)
        {
            return false;
        }

        if (args[0] == "--list-jobs")
        {
            MenuRenderer.PrintJobs(_scheduler.ListJobs());
            return true;
        }

        if (args[0] == "--history")
        {
            MenuRenderer.PrintHistory(_scheduler.ListHistory());
            return true;
        }

        if (args[0] == "--run-pending-once")
        {
            var executed = await _scheduler.RunPendingJobsAsync(DateTimeOffset.UtcNow, cancellationToken);
            MenuRenderer.PrintHistory(executed);
            return true;
        }

        if (args[0] == "--run-job" && args.Length >= 2)
        {
            var entry = await _scheduler.RunJobNowAsync(args[1], cancellationToken);
            MenuRenderer.PrintHistory(new[] { entry });
            return true;
        }

        MenuRenderer.PrintHelp();
        return true;
    }
}
