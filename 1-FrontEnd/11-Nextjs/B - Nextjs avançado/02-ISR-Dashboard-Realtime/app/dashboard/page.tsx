export const revalidate = 10;

function randomSeries() {
  return Array.from({ length: 7 }).map(() => Math.round(20 + Math.random() * 80));
}

export default function DashboardPage() {
  const series = randomSeries();
  return (
    <main className="container">
      <a href="/">Home</a>
      <h1 style={{ marginTop: 12 }}>Dashboard</h1>
      <p style={{ opacity: 0.75 }}>
        Atualiza a cada 10s via revalidate. (Em prod, isso vira ISR.)
      </p>
      <div className="card">
        <pre style={{ margin: 0 }}>{JSON.stringify({ series }, null, 2)}</pre>
      </div>
    </main>
  );
}

