namespace Study.CSharp.WebApiAspNetCore.Configuration;

public sealed class InventoryApiSettings
{
    public bool SeedData { get; init; } = true;
    public int DefaultPageSize { get; init; } = 10;
}
