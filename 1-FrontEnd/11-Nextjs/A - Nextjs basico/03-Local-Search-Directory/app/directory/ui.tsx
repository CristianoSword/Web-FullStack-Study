"use client";

import { useMemo, useState } from "react";

type Item = { id: string; name: string; city: string };

export default function DirectoryClient({ items }: { items: Item[] }) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter(
      (it) =>
        it.name.toLowerCase().includes(q) || it.city.toLowerCase().includes(q)
    );
  }, [items, query]);

  return (
    <>
      <div className="card">
        <label>
          Buscar
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="nome ou cidade"
            style={{
              width: "100%",
              marginTop: 8,
              padding: 10,
              borderRadius: 8,
              border: "1px solid rgba(255,255,255,0.14)",
              background: "rgba(255,255,255,0.06)",
              color: "inherit"
            }}
          />
        </label>
      </div>
      <div style={{ height: 12 }} />
      <div className="row">
        {filtered.map((it) => (
          <div key={it.id} className="card">
            <strong>{it.name}</strong>
            <div style={{ opacity: 0.75, marginTop: 6 }}>{it.city}</div>
          </div>
        ))}
      </div>
    </>
  );
}

