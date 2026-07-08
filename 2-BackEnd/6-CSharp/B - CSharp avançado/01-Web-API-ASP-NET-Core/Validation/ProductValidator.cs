using Study.CSharp.WebApiAspNetCore.Exceptions;
using Study.CSharp.WebApiAspNetCore.Models;

namespace Study.CSharp.WebApiAspNetCore.Validation;

public sealed class ProductValidator
{
    public void ValidateCreate(CreateProductRequest request)
    {
        ValidateSharedFields(request.Sku, request.Name, request.Category, request.QuantityInStock, request.UnitPrice);
    }

    public void ValidateUpdate(UpdateProductRequest request)
    {
        ValidateSharedFields(request.Sku, request.Name, request.Category, request.QuantityInStock, request.UnitPrice);
    }

    private static void ValidateSharedFields(string sku, string name, string category, int quantityInStock, decimal unitPrice)
    {
        if (string.IsNullOrWhiteSpace(sku) || sku.Length > 32)
        {
            throw new DomainValidationException("SKU is required and must contain at most 32 characters.");
        }

        if (string.IsNullOrWhiteSpace(name) || name.Length > 120)
        {
            throw new DomainValidationException("Name is required and must contain at most 120 characters.");
        }

        if (string.IsNullOrWhiteSpace(category) || category.Length > 80)
        {
            throw new DomainValidationException("Category is required and must contain at most 80 characters.");
        }

        if (quantityInStock < 0)
        {
            throw new DomainValidationException("QuantityInStock cannot be negative.");
        }

        if (unitPrice <= 0)
        {
            throw new DomainValidationException("UnitPrice must be greater than zero.");
        }
    }
}
