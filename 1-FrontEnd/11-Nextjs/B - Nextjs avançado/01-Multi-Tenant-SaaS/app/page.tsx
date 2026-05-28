export default function Home() {
  return (
    <main className="container">
      <h1>01 - Multi Tenant SaaS</h1>
      <p>Exemplo simples de tenant via header (mock).</p>
      <div className="card">
        <p>
          Este demo le <code>x-tenant</code> e mostra conteudo diferente.
        </p>
        <a href="/tenant/acme">Abrir tenant ACME</a>
      </div>
    </main>
  );
}
