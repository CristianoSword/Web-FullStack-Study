var builder = WebApplication.CreateBuilder(args);

builder.Services.AddGrpc();

var app = builder.Build();
app.MapGet("/", () => "Ordering gRPC service");
app.Run();
