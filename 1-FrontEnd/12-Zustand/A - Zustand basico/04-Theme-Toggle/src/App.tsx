import { useEffect } from "react";
import { useThemeStore } from "./store";

export default function App() {
  const theme = useThemeStore((s) => s.theme);
  const toggle = useThemeStore((s) => s.toggle);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  return (
    <main className="container">
      <h1>04 - Theme Toggle</h1>
      <div className="card" style={{ maxWidth: 520, display: "grid", gap: 10 }}>
        <div>
          Tema atual: <strong>{theme}</strong>
        </div>
        <button onClick={toggle}>Alternar</button>
      </div>
    </main>
  );
}

