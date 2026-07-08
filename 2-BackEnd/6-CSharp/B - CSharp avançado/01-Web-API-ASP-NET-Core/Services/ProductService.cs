using Study.CSharp.WebApiAspNetCore.Contracts;
using Study.CSharp.WebApiAspNetCore.Models;

namespace Study.CSharp.WebApiAspNetCore.Services;

public sealed class ProductService
{
    private readonly IProductRepository _repository;

    public ProductService(IProductRepository repository)
    {
        _repository = repository;
    }

    public async Task<IReadOnlyCollection<ProductResponse>> ListAsync(CancellationToken cancellationToken = default)
    {
        var products = await _repository.ListAsync(cancellationToken);
        return products.Select(MapResponse).ToArray();
    }

    public async Task<ProductResponse?> FindByIdAsync(Guid id, CancellationToken cancellationToken = default)
    {
        var product = await _repository.FindByIdAsync(id, cancellationToken);
        return product is null ? null : MapResponse(product);
    }

    public async Task<ProductResponse> CreateAsync(CreateProductRequest request, CancellationToken cancellationToken = default)
    {
        var product = new Product
        {
            Id = Guid.NewGuid(),
            Sku = request.Sku,
            Name = request.Name,
            Category = request.Category,
            QuantityInStock = request.QuantityInStock,
            UnitPrice = request.UnitPrice,
            CreatedAt = DateTimeOffset.UtcNow,
            UpdatedAt = DateTimeOffset.UtcNow,
        };

        await _repository.AddAsync(product, cancellationToken);
        return MapResponse(product);
    }

    public async Task<ProductResponse?> UpdateAsync(Guid id, UpdateProductRequest request, CancellationToken cancellationToken = default)
    {
        var product = await _repository.FindByIdAsync(id, cancellationToken);
        if (product is null)
        {
            return null;
        }

        product.Sku = request.Sku;
        product.Name = request.Name;
        product.Category = request.Category;
        product.QuantityInStock = request.QuantityInStock;
        product.UnitPrice = request.UnitPrice;
        product.UpdatedAt = DateTimeOffset.UtcNow;

        await _repository.UpdateAsync(product, cancellationToken);
        return MapResponse(product);
    }

    public async Task<bool> DeleteAsync(Guid id, CancellationToken cancellationToken = default)
    {
        var product = await _repository.FindByIdAsync(id, cancellationToken);
        if (product is null)
        {
            return false;
        }

        await _repository.DeleteAsync(product, cancellationToken);
        return true;
    }

    private static ProductResponse MapResponse(Product product)
    {
        return new ProductResponse(
            product.Id,
            product.Sku,
            product.Name,
            product.Category,
            product.QuantityInStock,
            product.UnitPrice,
            product.CreatedAt,
            product.UpdatedAt);
    }
}
