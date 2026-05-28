export default function Home() {
  return (
    <main className="container">
      <h1>02 - Dynamic Product Detail</h1>
      <p>Pagina de produto com rota dinamica e SSR.</p>
      <div className="card">
        <a href="/products/sku-001">Abrir produto exemplo</a>
      </div>
    </main>
  );
}
