import { useState } from "react";
import { useAuthStore } from "./store";

export default function App() {
  const user = useAuthStore((s) => s.user);
  const login = useAuthStore((s) => s.login);
  const logout = useAuthStore((s) => s.logout);
  const [email, setEmail] = useState("");

  return (
    <main className="container">
      <h1>03 - User Auth State</h1>
      <div className="card" style={{ maxWidth: 520, display: "grid", gap: 10 }}>
        {user ? (
          <>
            <div>
              Logado como <strong>{user.email}</strong>
            </div>
            <button onClick={logout}>Logout</button>
          </>
        ) : (
          <>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="email"
              style={{
                padding: 10,
                borderRadius: 8,
                border: "1px solid rgba(255,255,255,0.14)",
                background: "rgba(255,255,255,0.06)",
                color: "inherit"
              }}
            />
            <button onClick={() => login(email.trim())} disabled={!email.trim()}>
              Login
            </button>
          </>
        )}
      </div>
    </main>
  );
}

