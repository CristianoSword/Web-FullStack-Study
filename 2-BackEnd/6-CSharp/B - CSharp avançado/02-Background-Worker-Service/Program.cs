using Study.CSharp.BackgroundWorkerService.Configuration;
using Study.CSharp.BackgroundWorkerService.Workers;

var builder = Host.CreateApplicationBuilder(args);

builder.Services.Configure<WorkerRuntimeSettings>(builder.Configuration.GetSection("Worker"));
builder.Services.AddHostedService<ScheduledWorker>();

var host = builder.Build();
await host.RunAsync();
