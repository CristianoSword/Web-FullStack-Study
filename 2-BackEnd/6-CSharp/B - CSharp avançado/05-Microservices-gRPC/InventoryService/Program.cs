var builder = WebApplication.CreateBuilder(args);

builder.Services.AddGrpc();

var app = builder.Build();
app.MapGet("/", () => "Inventory gRPC service");
app.Run();
