import { useToastStore } from "./store";

function Toasts() {
  const toasts = useToastStore((s) => s.toasts);
  const dismiss = useToastStore((s) => s.dismiss);
  return (
    <div style={{ position: "fixed", right: 16, top: 16, display: "grid", gap: 10 }}>
      {toasts.map((t) => (
        <div key={t.id} className="card" style={{ minWidth: 260 }}>
          <strong>{t.title}</strong>
          <div style={{ opacity: 0.75, marginTop: 6 }}>{t.message}</div>
          <div style={{ marginTop: 10 }}>
            <button onClick={() => dismiss(t.id)}>Fechar</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function App() {
  const push = useToastStore((s) => s.push);

  return (
    <main className="container">
      <h1>05 - Notification Toast System</h1>
      <div className="card" style={{ maxWidth: 520, display: "grid", gap: 10 }}>
        <button
          onClick={() =>
            push({
              title: "Toast",
              message: "Mensagem gerada em " + new Date().toLocaleTimeString()
            })
          }
        >
          Disparar toast
        </button>
      </div>
      <Toasts />
    </main>
  );
}

