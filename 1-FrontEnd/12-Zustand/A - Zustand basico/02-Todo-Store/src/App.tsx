import { useMemo, useState } from "react";
import { useTodoStore } from "./store";

export default function App() {
  const [title, setTitle] = useState("");
  const filter = useTodoStore((s) => s.filter);
  const setFilter = useTodoStore((s) => s.setFilter);
  const items = useTodoStore((s) => s.items);
  const add = useTodoStore((s) => s.add);
  const toggle = useTodoStore((s) => s.toggle);
  const remove = useTodoStore((s) => s.remove);

  const visible = useMemo(() => {
    if (filter === "all") return items;
    if (filter === "active") return items.filter((i) => !i.done);
    return items.filter((i) => i.done);
  }, [filter, items]);

  return (
    <main className="container">
      <h1>02 - Todo Store</h1>
      <div className="card" style={{ display: "grid", gap: 10 }}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const t = title.trim();
            if (!t) return;
            add(t);
            setTitle("");
          }}
          style={{ display: "flex", gap: 8, flexWrap: "wrap" }}
        >
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Nova tarefa"
            style={{
              flex: "1 1 260px",
              padding: 10,
              borderRadius: 8,
              border: "1px solid rgba(255,255,255,0.14)",
              background: "rgba(255,255,255,0.06)",
              color: "inherit"
            }}
          />
          <button type="submit">Adicionar</button>
        </form>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <button
            onClick={() => setFilter("all")}
            aria-pressed={filter === "all"}
          >
            Todas
          </button>
          <button
            onClick={() => setFilter("active")}
            aria-pressed={filter === "active"}
          >
            Ativas
          </button>
          <button
            onClick={() => setFilter("done")}
            aria-pressed={filter === "done"}
          >
            Concluidas
          </button>
        </div>
      </div>
      <div style={{ height: 12 }} />
      <div className="row">
        {visible.map((it) => (
          <div key={it.id} className="card">
            <label style={{ display: "flex", gap: 10, alignItems: "center" }}>
              <input
                type="checkbox"
                checked={it.done}
                onChange={() => toggle(it.id)}
              />
              <span style={{ textDecoration: it.done ? "line-through" : "" }}>
                {it.title}
              </span>
            </label>
            <div style={{ marginTop: 10 }}>
              <button onClick={() => remove(it.id)}>Remover</button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

