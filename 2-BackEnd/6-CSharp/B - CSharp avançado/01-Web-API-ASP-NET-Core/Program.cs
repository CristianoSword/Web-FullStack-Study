using Study.CSharp.WebApiAspNetCore.Configuration;

var builder = WebApplication.CreateBuilder(args);

builder.Services.Configure<InventoryApiSettings>(builder.Configuration.GetSection("InventoryApi"));
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
