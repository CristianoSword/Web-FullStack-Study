using Study.CSharp.CqrsMediatRPattern.Configuration;
using Study.CSharp.CqrsMediatRPattern.Contracts;
using Study.CSharp.CqrsMediatRPattern.Repositories;
using Study.CSharp.CqrsMediatRPattern.Services;

var builder = WebApplication.CreateBuilder(args);

builder.Services.Configure<TicketingSettings>(builder.Configuration.GetSection("Ticketing"));
builder.Services.AddMediatR(configuration => configuration.RegisterServicesFromAssembly(typeof(Program).Assembly));
builder.Services.AddSingleton<ISupportTicketRepository, InMemorySupportTicketRepository>();
builder.Services.AddSingleton<TicketSeeder>();
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.MapControllers();

await using (var scope = app.Services.CreateAsyncScope())
{
    var seeder = scope.ServiceProvider.GetRequiredService<TicketSeeder>();
    await seeder.SeedAsync();
}

app.Run();
