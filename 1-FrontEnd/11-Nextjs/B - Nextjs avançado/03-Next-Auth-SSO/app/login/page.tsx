export default function LoginPage() {
  return (
    <main className="container">
      <h1>Login</h1>
      <div className="card" style={{ maxWidth: 520 }}>
        <form action="/api/mock-login" method="post" style={{ display: "grid", gap: 10 }}>
          <label>
            Email
            <input
              name="email"
              type="email"
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
            Senha
            <input
              name="password"
              type="password"
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
            Entrar
          </button>
        </form>
      </div>
      <p style={{ marginTop: 12, opacity: 0.75 }}>
        Esse e um mock. Em um projeto real, voce usaria NextAuth/Providers/OAuth.
      </p>
    </main>
  );
}

