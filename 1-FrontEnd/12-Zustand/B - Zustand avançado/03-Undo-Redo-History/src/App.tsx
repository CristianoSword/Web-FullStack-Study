import { useHistoryStore } from "./store";

export default function App() {
  const value = useHistoryStore((s) => s.present);
  const setValue = useHistoryStore((s) => s.set);
  const undo = useHistoryStore((s) => s.undo);
  const redo = useHistoryStore((s) => s.redo);
  const canUndo = useHistoryStore((s) => s.past.length > 0);
  const canRedo = useHistoryStore((s) => s.future.length > 0);

  return (
    <main className="container">
      <h1>Undo / Redo</h1>
      <div className="card" style={{ maxWidth: 520, display: "grid", gap: 10 }}>
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="digite algo"
          style={{
            padding: 10,
            borderRadius: 8,
            border: "1px solid rgba(255,255,255,0.14)",
            background: "rgba(255,255,255,0.06)",
            color: "inherit"
          }}
        />
        <div style={{ display: "flex", gap: 8 }}>
          <button onClick={undo} disabled={!canUndo}>
            Undo
          </button>
          <button onClick={redo} disabled={!canRedo}>
            Redo
          </button>
        </div>
      </div>
    </main>
  );
}

