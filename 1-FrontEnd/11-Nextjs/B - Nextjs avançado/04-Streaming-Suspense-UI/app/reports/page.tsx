import { Suspense } from "react";

async function SlowBlock({ label }: { label: string }) {
  await new Promise((r) => setTimeout(r, 600));
  return <div className="card">Bloco: {label}</div>;
}

export default function ReportsPage() {
  return (
    <main className="container">
      <h1>Relatorios</h1>
      <p style={{ opacity: 0.75 }}>
        A pagina renderiza e libera partes conforme cada Suspense resolve.
      </p>
      <div className="row">
        <Suspense fallback={<div className="card">Carregando A...</div>}>
          {/* @ts-expect-error Server Component async */}
          <SlowBlock label="A" />
        </Suspense>
        <Suspense fallback={<div className="card">Carregando B...</div>}>
          {/* @ts-expect-error Server Component async */}
          <SlowBlock label="B" />
        </Suspense>
      </div>
    </main>
  );
}

