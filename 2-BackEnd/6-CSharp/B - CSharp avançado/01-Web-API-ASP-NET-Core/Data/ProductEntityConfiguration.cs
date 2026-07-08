using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Study.CSharp.WebApiAspNetCore.Models;

namespace Study.CSharp.WebApiAspNetCore.Data;

public sealed class ProductEntityConfiguration : IEntityTypeConfiguration<Product>
{
    public void Configure(EntityTypeBuilder<Product> builder)
    {
        builder.ToTable("Products");
        builder.HasKey(product => product.Id);

        builder.Property(product => product.Sku)
            .HasMaxLength(32)
            .IsRequired();

        builder.Property(product => product.Name)
            .HasMaxLength(120)
            .IsRequired();

        builder.Property(product => product.Category)
            .HasMaxLength(80)
            .IsRequired();

        builder.Property(product => product.UnitPrice)
            .HasPrecision(18, 2);

        builder.HasIndex(product => product.Sku)
            .IsUnique();
    }
}
