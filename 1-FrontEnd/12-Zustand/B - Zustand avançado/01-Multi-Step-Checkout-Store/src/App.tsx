import { useCheckoutStore } from "./store";

export default function App() {
  const step = useCheckoutStore((s) => s.step);
  const data = useCheckoutStore((s) => s.data);
  const setField = useCheckoutStore((s) => s.setField);
  const next = useCheckoutStore((s) => s.next);
  const back = useCheckoutStore((s) => s.back);

  return (
    <main className="container">
      <h1>Checkout</h1>
      <div className="card" style={{ maxWidth: 640, display: "grid", gap: 10 }}>
        <strong>Step {step}/3</strong>
        {step === 1 && (
          <input
            value={data.email}
            onChange={(e) => setField("email", e.target.value)}
            placeholder="email"
            style={{
              padding: 10,
              borderRadius: 8,
              border: "1px solid rgba(255,255,255,0.14)",
              background: "rgba(255,255,255,0.06)",
              color: "inherit"
            }}
          />
        )}
        {step === 2 && (
          <input
            value={data.address}
            onChange={(e) => setField("address", e.target.value)}
            placeholder="endereco"
            style={{
              padding: 10,
              borderRadius: 8,
              border: "1px solid rgba(255,255,255,0.14)",
              background: "rgba(255,255,255,0.06)",
              color: "inherit"
            }}
          />
        )}
        {step === 3 && (
          <pre style={{ margin: 0 }}>{JSON.stringify(data, null, 2)}</pre>
        )}
        <div style={{ display: "flex", gap: 8 }}>
          <button onClick={back} disabled={step === 1}>
            Voltar
          </button>
          <button onClick={next} disabled={step === 3}>
            Proximo
          </button>
        </div>
      </div>
    </main>
  );
}

