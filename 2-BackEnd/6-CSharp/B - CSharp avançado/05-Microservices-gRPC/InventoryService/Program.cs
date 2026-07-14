using Study.CSharp.Grpc.InventoryService.Contracts;
using Study.CSharp.Grpc.InventoryService.Interceptors;
using Study.CSharp.Grpc.InventoryService.Repositories;
using Study.CSharp.Grpc.InventoryService.Services;
using Study.CSharp.Grpc.InventoryService.Validation;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddGrpc(options => options.Interceptors.Add<GrpcExceptionInterceptor>());
builder.Services.AddSingleton<IInventoryRepository, InMemoryInventoryRepository>();
builder.Services.AddSingleton<InventoryRequestValidator>();
builder.Services.AddSingleton<InventoryManager>();
builder.Services.AddSingleton<GrpcExceptionInterceptor>();

var app = builder.Build();
app.MapGrpcService<Grpc.InventoryGrpcService>();
app.MapGet("/health", () => Results.Ok(new { status = "inventory-ok" }));
app.MapGet("/", () => "Use a gRPC client to communicate with InventoryService.");
app.Run();
