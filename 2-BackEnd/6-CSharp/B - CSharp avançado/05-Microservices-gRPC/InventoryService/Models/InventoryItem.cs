namespace Study.CSharp.Grpc.InventoryService.Models;

public sealed class InventoryItem
{
    public string Sku { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public int AvailableQuantity { get; set; }
}
