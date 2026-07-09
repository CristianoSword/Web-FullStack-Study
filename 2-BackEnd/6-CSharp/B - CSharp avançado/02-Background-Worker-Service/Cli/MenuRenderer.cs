using Study.CSharp.BackgroundWorkerService.Models;

namespace Study.CSharp.BackgroundWorkerService.Cli;

public static class MenuRenderer
{
    public static void PrintHelp()
    {
        Console.WriteLine("Background Worker Service commands:");
        Console.WriteLine("  --list-jobs");
        Console.WriteLine("  --history");
        Console.WriteLine("  --run-job <job-name>");
        Console.WriteLine("  --run-pending-once");
    }

    public static void PrintJobs(IReadOnlyCollection<WorkerJobDefinition> jobs)
    {
        foreach (var job in jobs)
        {
            Console.WriteLine($"{job.Name} | handler: {job.Handler} | cron: {job.Cron} | payload: {job.Payload}");
        }
    }

    public static void PrintHistory(IReadOnlyCollection<JobExecutionLogEntry> entries)
    {
        if (entries.Count == 0)
        {
            Console.WriteLine("No jobs have been executed yet.");
            return;
        }

        foreach (var entry in entries)
        {
            Console.WriteLine(
                $"{entry.JobName} | {entry.Handler} | success: {entry.Success} | {entry.StartedAt:yyyy-MM-dd HH:mm:ss} | {entry.Summary}");
        }
    }
}
