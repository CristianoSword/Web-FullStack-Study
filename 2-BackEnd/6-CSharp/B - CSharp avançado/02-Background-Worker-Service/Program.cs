using Study.CSharp.BackgroundWorkerService.Configuration;
using Study.CSharp.BackgroundWorkerService.Cli;
using Study.CSharp.BackgroundWorkerService.Contracts;
using Study.CSharp.BackgroundWorkerService.Handlers;
using Study.CSharp.BackgroundWorkerService.Services;
using Study.CSharp.BackgroundWorkerService.Workers;

var builder = Host.CreateApplicationBuilder(args);

builder.Services.Configure<WorkerRuntimeSettings>(builder.Configuration.GetSection("Worker"));
builder.Services.AddSingleton<IJobExecutionLogRepository, InMemoryJobExecutionLogRepository>();
builder.Services.AddSingleton<IWorkerJobHandler, CleanupTempFilesHandler>();
builder.Services.AddSingleton<IWorkerJobHandler, ReportSyncHandler>();
builder.Services.AddSingleton<JobScheduler>();
builder.Services.AddSingleton<WorkerCommandRouter>();
builder.Services.AddHostedService<ScheduledWorker>();

var host = builder.Build();

using (var scope = host.Services.CreateScope())
{
    var commandRouter = scope.ServiceProvider.GetRequiredService<WorkerCommandRouter>();
    var handled = await commandRouter.TryHandleAsync(args, CancellationToken.None);
    if (handled)
    {
        return;
    }
}

await host.RunAsync();
