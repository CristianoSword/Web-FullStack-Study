using Study.CSharp.Grpc.InventoryService.Contracts;
using Study.CSharp.Grpc.InventoryService.Repositories;
using Study.CSharp.Grpc.InventoryService.Services;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddGrpc();
builder.Services.AddSingleton<IInventoryRepository, InMemoryInventoryRepository>();
builder.Services.AddSingleton<InventoryManager>();

var app = builder.Build();
app.MapGrpcService<Grpc.InventoryGrpcService>();
app.MapGet("/health", () => Results.Ok(new { status = "inventory-ok" }));
app.MapGet("/", () => "Use a gRPC client to communicate with InventoryService.");
app.Run();
