import { notFound } from "next/navigation";

type Entry = { id: string; title: string; body: string };

const ENTRIES: Entry[] = [
  { id: "news-1", title: "Primeira Noticia", body: "Conteudo vindo do CMS." },
  { id: "news-2", title: "Atualizacao de Produto", body: "Preview e rascunhos em um CMS real." }
];

export default async function EntryPage({
  params
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const entry = ENTRIES.find((e) => e.id === id);
  if (!entry) notFound();

  return (
    <main className="container">
      <a href="/content">Voltar</a>
      <h1 style={{ marginTop: 12 }}>{entry.title}</h1>
      <div className="card">{entry.body}</div>
    </main>
  );
}

