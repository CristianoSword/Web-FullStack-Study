using Study.CSharp.WebApiAspNetCore.Configuration;
using Study.CSharp.WebApiAspNetCore.Contracts;
using Study.CSharp.WebApiAspNetCore.Data;
using Study.CSharp.WebApiAspNetCore.Middleware;
using Study.CSharp.WebApiAspNetCore.Repositories;
using Study.CSharp.WebApiAspNetCore.Services;
using Study.CSharp.WebApiAspNetCore.Validation;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.Configure<InventoryApiSettings>(builder.Configuration.GetSection("InventoryApi"));
builder.Services.AddDbContext<InventoryDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));
builder.Services.AddScoped<IProductRepository, ProductRepository>();
builder.Services.AddScoped<ProductValidator>();
builder.Services.AddScoped<ProductService>();
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseMiddleware<ApiExceptionMiddleware>();
app.UseHttpsRedirection();
app.MapControllers();

await using (var scope = app.Services.CreateAsyncScope())
{
    var dbContext = scope.ServiceProvider.GetRequiredService<InventoryDbContext>();
    await InventoryDbContextSeed.SeedAsync(dbContext);
}

app.Run();
