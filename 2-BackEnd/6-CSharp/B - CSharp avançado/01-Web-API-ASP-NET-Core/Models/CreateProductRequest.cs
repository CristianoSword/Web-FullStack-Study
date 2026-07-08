namespace Study.CSharp.WebApiAspNetCore.Models;

public sealed record CreateProductRequest(
    string Sku,
    string Name,
    string Category,
    int QuantityInStock,
    decimal UnitPrice);
