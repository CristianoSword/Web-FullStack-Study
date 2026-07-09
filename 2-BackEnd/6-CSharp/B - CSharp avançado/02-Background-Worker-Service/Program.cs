using Study.CSharp.BackgroundWorkerService.Configuration;
using Study.CSharp.BackgroundWorkerService.Cli;
using Study.CSharp.BackgroundWorkerService.Contracts;
using Study.CSharp.BackgroundWorkerService.Exceptions;
using Study.CSharp.BackgroundWorkerService.Handlers;
using Study.CSharp.BackgroundWorkerService.Services;
using Study.CSharp.BackgroundWorkerService.Validation;
using Study.CSharp.BackgroundWorkerService.Workers;

var builder = Host.CreateApplicationBuilder(args);

builder.Services.Configure<WorkerRuntimeSettings>(builder.Configuration.GetSection("Worker"));
builder.Services.AddSingleton<IJobExecutionLogRepository, InMemoryJobExecutionLogRepository>();
builder.Services.AddSingleton<IWorkerJobHandler, CleanupTempFilesHandler>();
builder.Services.AddSingleton<IWorkerJobHandler, ReportSyncHandler>();
builder.Services.AddSingleton<WorkerConfigurationValidator>();
builder.Services.AddSingleton<JobScheduler>();
builder.Services.AddSingleton<WorkerCommandRouter>();
builder.Services.AddHostedService<ScheduledWorker>();

var host = builder.Build();

using (var scope = host.Services.CreateScope())
{
    var commandRouter = scope.ServiceProvider.GetRequiredService<WorkerCommandRouter>();
    try
    {
        var handled = await commandRouter.TryHandleAsync(args, CancellationToken.None);
        if (handled)
        {
            return;
        }
    }
    catch (DomainValidationException exception)
    {
        Console.Error.WriteLine($"Validation error: {exception.Message}");
        return;
    }
    catch (InvalidOperationException exception)
    {
        Console.Error.WriteLine(exception.Message);
        return;
    }
}

await host.RunAsync();
