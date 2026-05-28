export default async function TenantPage({
  params
}: {
  params: Promise<{ tenant: string }>;
}) {
  const { tenant } = await params;
  return (
    <main className="container">
      <a href="/">Home</a>
      <h1 style={{ marginTop: 12 }}>Tenant: {tenant}</h1>
      <div className="card">
        <p>
          Em um projeto real, o middleware validaria subdominio/header e aplicaria
          roteamento.
        </p>
      </div>
    </main>
  );
}

