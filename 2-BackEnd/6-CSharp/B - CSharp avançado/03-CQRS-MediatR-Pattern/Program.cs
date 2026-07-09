using Study.CSharp.CqrsMediatRPattern.Configuration;

var builder = WebApplication.CreateBuilder(args);

builder.Services.Configure<TicketingSettings>(builder.Configuration.GetSection("Ticketing"));
builder.Services.AddMediatR(configuration => configuration.RegisterServicesFromAssembly(typeof(Program).Assembly));
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
app.Run();
