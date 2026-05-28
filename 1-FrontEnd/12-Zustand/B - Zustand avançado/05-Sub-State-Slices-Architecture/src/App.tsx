import { useAppStore } from "./store";

export default function App() {
  const count = useAppStore((s) => s.counter.count);
  const inc = useAppStore((s) => s.counter.inc);
  const name = useAppStore((s) => s.profile.name);
  const setName = useAppStore((s) => s.profile.setName);

  return (
    <main className="container">
      <h1>Slices</h1>
      <div className="row">
        <div className="card" style={{ display: "grid", gap: 10 }}>
          <strong>Counter slice</strong>
          <div style={{ fontSize: 36, fontWeight: 700 }}>{count}</div>
          <button onClick={() => inc(1)}>+1</button>
        </div>
        <div className="card" style={{ display: "grid", gap: 10 }}>
          <strong>Profile slice</strong>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="nome"
            style={{
              padding: 10,
              borderRadius: 8,
              border: "1px solid rgba(255,255,255,0.14)",
              background: "rgba(255,255,255,0.06)",
              color: "inherit"
            }}
          />
        </div>
      </div>
    </main>
  );
}

