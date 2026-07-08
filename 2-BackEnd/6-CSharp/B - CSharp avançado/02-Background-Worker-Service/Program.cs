using Study.CSharp.BackgroundWorkerService.Configuration;
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
builder.Services.AddHostedService<ScheduledWorker>();

var host = builder.Build();
await host.RunAsync();
