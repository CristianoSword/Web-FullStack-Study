import { notFound } from "next/navigation";

type Product = { sku: string; name: string; price: number; description: string };

const PRODUCTS: Product[] = [
  {
    sku: "sku-001",
    name: "Teclado Mecanico",
    price: 399.9,
    description: "Produto renderizado em rota dinamica."
  },
  {
    sku: "sku-002",
    name: "Mouse Gamer",
    price: 199.9,
    description: "Outro exemplo para testar navegacao."
  }
];

export default async function ProductPage({
  params
}: {
  params: Promise<{ sku: string }>;
}) {
  const { sku } = await params;
  const product = PRODUCTS.find((p) => p.sku === sku);
  if (!product) notFound();

  return (
    <main className="container">
      <a href="/">Voltar</a>
      <h1 style={{ marginTop: 12 }}>{product.name}</h1>
      <p style={{ opacity: 0.75 }}>{product.sku}</p>
      <div className="card">
        <strong>R$ {product.price.toFixed(2)}</strong>
        <p style={{ marginTop: 12 }}>{product.description}</p>
        <div style={{ marginTop: 12, display: "flex", gap: 12 }}>
          <a href="/products/sku-001">sku-001</a>
          <a href="/products/sku-002">sku-002</a>
        </div>
      </div>
    </main>
  );
}

