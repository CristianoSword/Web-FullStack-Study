import { useEffect } from "react";
import { useRealtimeStore } from "./store";

export default function App() {
  const connected = useRealtimeStore((s) => s.connected);
  const events = useRealtimeStore((s) => s.events);
  const connect = useRealtimeStore((s) => s.connect);
  const disconnect = useRealtimeStore((s) => s.disconnect);

  useEffect(() => {
    connect();
    return () => disconnect();
  }, [connect, disconnect]);

  return (
    <main className="container">
      <h1>Realtime Data Sync (Mock)</h1>
      <div className="card">
        Status: <strong>{connected ? "conectado" : "desconectado"}</strong>
      </div>
      <div style={{ height: 12 }} />
      <div className="card">
        <pre style={{ margin: 0 }}>{JSON.stringify(events.slice(0, 10), null, 2)}</pre>
      </div>
    </main>
  );
}

