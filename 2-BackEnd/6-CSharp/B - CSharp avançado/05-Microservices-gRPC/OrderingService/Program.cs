using Study.CSharp.Grpc.Contracts.Inventory;
using Study.CSharp.Grpc.OrderingService.Contracts;
using Study.CSharp.Grpc.OrderingService.Interceptors;
using Study.CSharp.Grpc.OrderingService.Repositories;
using Study.CSharp.Grpc.OrderingService.Services;
using Study.CSharp.Grpc.OrderingService.Validation;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddGrpc(options => options.Interceptors.Add<GrpcExceptionInterceptor>());
builder.Services.AddSingleton<IOrderRepository, InMemoryOrderRepository>();
builder.Services.AddSingleton<OrderRequestValidator>();
builder.Services.AddSingleton<OrderingCoordinator>();
builder.Services.AddGrpcClient<InventoryService.InventoryServiceClient>(options =>
{
    options.Address = new Uri(builder.Configuration["GrpcClients:Inventory"] ?? "https://localhost:6001");
});
builder.Services.AddSingleton<InventoryGateway>();
builder.Services.AddSingleton<GrpcExceptionInterceptor>();

var app = builder.Build();
app.MapGrpcService<Grpc.OrderingGrpcService>();
app.MapGet("/health", () => Results.Ok(new { status = "ordering-ok" }));
app.MapGet("/", () => "Use a gRPC client to communicate with OrdersService.");
app.Run();
