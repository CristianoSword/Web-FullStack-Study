import { useCounterStore } from "./store";

export default function App() {
  const count = useCounterStore((s) => s.count);
  const inc = useCounterStore((s) => s.inc);
  const dec = useCounterStore((s) => s.dec);
  const reset = useCounterStore((s) => s.reset);

  return (
    <main className="container">
      <h1>01 - Simple Counter</h1>
      <div className="card" style={{ display: "grid", gap: 12, maxWidth: 520 }}>
        <div style={{ fontSize: 42, fontWeight: 700 }}>{count}</div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <button onClick={() => dec(1)}>-1</button>
          <button onClick={() => inc(1)}>+1</button>
          <button onClick={() => inc(5)}>+5</button>
          <button onClick={reset}>reset</button>
        </div>
        <p style={{ opacity: 0.75, margin: 0 }}>
          Persiste no localStorage via middleware <code>persist</code>.
        </p>
      </div>
    </main>
  );
}

