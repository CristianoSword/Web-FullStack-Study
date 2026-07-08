using Study.CSharp.WebApiAspNetCore.Models;

namespace Study.CSharp.WebApiAspNetCore.Contracts;

public interface IProductRepository
{
    Task<IReadOnlyCollection<Product>> ListAsync(CancellationToken cancellationToken = default);
    Task<Product?> FindByIdAsync(Guid id, CancellationToken cancellationToken = default);
    Task AddAsync(Product product, CancellationToken cancellationToken = default);
    Task UpdateAsync(Product product, CancellationToken cancellationToken = default);
    Task DeleteAsync(Product product, CancellationToken cancellationToken = default);
    Task<bool> ExistsBySkuAsync(string sku, Guid? ignoreId = null, CancellationToken cancellationToken = default);
}
