using Microsoft.EntityFrameworkCore;
using Study.CSharp.WebApiAspNetCore.Models;

namespace Study.CSharp.WebApiAspNetCore.Data;

public static class InventoryDbContextSeed
{
    public static async Task SeedAsync(InventoryDbContext dbContext, CancellationToken cancellationToken = default)
    {
        await dbContext.Database.MigrateAsync(cancellationToken);

        if (await dbContext.Products.AnyAsync(cancellationToken))
        {
            return;
        }

        var now = DateTimeOffset.UtcNow;
        var products = new[]
        {
            new Product
            {
                Id = Guid.NewGuid(),
                Sku = "KB-1001",
                Name = "Mechanical Keyboard",
                Category = "Peripherals",
                QuantityInStock = 24,
                UnitPrice = 459.90m,
                CreatedAt = now,
                UpdatedAt = now,
            },
            new Product
            {
                Id = Guid.NewGuid(),
                Sku = "MS-1002",
                Name = "Wireless Mouse",
                Category = "Peripherals",
                QuantityInStock = 38,
                UnitPrice = 189.50m,
                CreatedAt = now,
                UpdatedAt = now,
            },
            new Product
            {
                Id = Guid.NewGuid(),
                Sku = "MN-1003",
                Name = "27-inch Monitor",
                Category = "Displays",
                QuantityInStock = 12,
                UnitPrice = 1599.00m,
                CreatedAt = now,
                UpdatedAt = now,
            },
        };

        await dbContext.Products.AddRangeAsync(products, cancellationToken);
        await dbContext.SaveChangesAsync(cancellationToken);
    }
}
