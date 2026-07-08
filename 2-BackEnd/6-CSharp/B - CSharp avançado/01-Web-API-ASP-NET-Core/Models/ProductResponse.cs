namespace Study.CSharp.WebApiAspNetCore.Models;

public sealed record ProductResponse(
    Guid Id,
    string Sku,
    string Name,
    string Category,
    int QuantityInStock,
    decimal UnitPrice,
    DateTimeOffset CreatedAt,
    DateTimeOffset UpdatedAt);
