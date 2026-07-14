using System.Net.Mail;
using Study.CSharp.Grpc.OrderingService.Exceptions;

namespace Study.CSharp.Grpc.OrderingService.Validation;

public sealed class OrderRequestValidator
{
    public void Validate(string customerEmail, string sku, int quantity)
    {
        try
        {
            _ = new MailAddress(customerEmail);
        }
        catch (FormatException)
        {
            throw new DomainValidationException("Customer email must be a valid email address.");
        }

        if (string.IsNullOrWhiteSpace(sku))
        {
            throw new DomainValidationException("SKU is required.");
        }

        if (quantity <= 0)
        {
            throw new DomainValidationException("Quantity must be greater than zero.");
        }
    }
}
