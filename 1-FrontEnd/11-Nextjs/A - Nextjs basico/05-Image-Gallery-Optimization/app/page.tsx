export default function Home() {
  return (
    <main className="container">
      <h1>05 - Image Gallery Optimization</h1>
      <p>Exemplo de galeria com imagens otimizadas.</p>
      <div className="row">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="card">
            <div
              style={{
                aspectRatio: "16/10",
                borderRadius: 8,
                background:
                  "linear-gradient(135deg, rgba(255,255,255,0.12), rgba(255,255,255,0.02))",
                display: "grid",
                placeItems: "center"
              }}
            >
              <span style={{ opacity: 0.75 }}>Imagem {i + 1}</span>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
