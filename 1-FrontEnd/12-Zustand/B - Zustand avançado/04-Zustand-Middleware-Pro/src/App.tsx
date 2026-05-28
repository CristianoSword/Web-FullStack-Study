import { useLoggedStore } from "./store";

export default function App() {
  const value = useLoggedStore((s) => s.value);
  const setValue = useLoggedStore((s) => s.setValue);
  const log = useLoggedStore((s) => s.log);

  return (
    <main className="container">
      <h1>Middleware Pro (Mock)</h1>
      <div className="row">
        <div className="card">
          <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="valor"
            style={{
              width: "100%",
              padding: 10,
              borderRadius: 8,
              border: "1px solid rgba(255,255,255,0.14)",
              background: "rgba(255,255,255,0.06)",
              color: "inherit"
            }}
          />
        </div>
        <div className="card">
          <strong>Log</strong>
          <pre style={{ marginTop: 8, marginBottom: 0 }}>
            {JSON.stringify(log.slice(0, 6), null, 2)}
          </pre>
        </div>
      </div>
    </main>
  );
}

