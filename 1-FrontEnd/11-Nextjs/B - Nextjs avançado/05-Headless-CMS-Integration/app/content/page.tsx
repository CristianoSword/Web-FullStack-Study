type Entry = { id: string; title: string; updatedAt: string };

const ENTRIES: Entry[] = [
  { id: "news-1", title: "Primeira Noticia", updatedAt: "2026-05-28" },
  { id: "news-2", title: "Atualizacao de Produto", updatedAt: "2026-05-28" }
];

export default function ContentIndex() {
  return (
    <main className="container">
      <h1>Conteudos</h1>
      <div className="row">
        {ENTRIES.map((e) => (
          <a key={e.id} className="card" href={`/content/${e.id}`}>
            <strong>{e.title}</strong>
            <div style={{ opacity: 0.7, marginTop: 8 }}>{e.updatedAt}</div>
          </a>
        ))}
      </div>
    </main>
  );
}

