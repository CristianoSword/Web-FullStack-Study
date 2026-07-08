namespace Study.CSharp.WebApiAspNetCore.Models;

public sealed record UpdateProductRequest(
    string Sku,
    string Name,
    string Category,
    int QuantityInStock,
    decimal UnitPrice);
