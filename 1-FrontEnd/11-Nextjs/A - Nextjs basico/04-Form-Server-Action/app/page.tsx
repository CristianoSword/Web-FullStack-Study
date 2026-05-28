export default function Home() {
  return (
    <main className="container">
      <h1>04 - Form Server Action</h1>
      <p>Formulario simples que usa Server Action.</p>
      <div className="card" style={{ maxWidth: 520 }}>
        <form action="/contact" style={{ display: "grid", gap: 10 }}>
          <label>
            Nome
            <input
              name="name"
              required
              style={{
                width: "100%",
                marginTop: 6,
                padding: 10,
                borderRadius: 8,
                border: "1px solid rgba(255,255,255,0.14)",
                background: "rgba(255,255,255,0.06)",
                color: "inherit"
              }}
            />
          </label>
          <label>
            Mensagem
            <textarea
              name="message"
              required
              rows={4}
              style={{
                width: "100%",
                marginTop: 6,
                padding: 10,
                borderRadius: 8,
                border: "1px solid rgba(255,255,255,0.14)",
                background: "rgba(255,255,255,0.06)",
                color: "inherit"
              }}
            />
          </label>
          <button
            type="submit"
            style={{
              padding: "10px 12px",
              borderRadius: 8,
              border: "1px solid rgba(255,255,255,0.14)",
              background: "rgba(255,255,255,0.10)",
              color: "inherit",
              cursor: "pointer"
            }}
          >
            Enviar
          </button>
        </form>
      </div>
    </main>
  );
}
