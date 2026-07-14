using Study.CSharp.Grpc.InventoryService.Exceptions;

namespace Study.CSharp.Grpc.InventoryService.Validation;

public sealed class InventoryRequestValidator
{
    public void ValidateSku(string sku)
    {
        if (string.IsNullOrWhiteSpace(sku))
        {
            throw new DomainValidationException("SKU is required.");
        }
    }

    public void ValidateReservation(string sku, int quantity)
    {
        ValidateSku(sku);

        if (quantity <= 0)
        {
            throw new DomainValidationException("Quantity must be greater than zero.");
        }
    }
}
