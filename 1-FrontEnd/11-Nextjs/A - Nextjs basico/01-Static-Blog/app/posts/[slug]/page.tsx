import type { Metadata } from "next";
import { notFound } from "next/navigation";

type Post = { slug: string; title: string; date: string; body: string };

const POSTS: Post[] = [
  {
    slug: "ola-next",
    title: "Ola Next.js",
    date: "2026-05-28",
    body: "# Ola\n\nEsse e um post em Markdown bem simples."
  },
  {
    slug: "ssg-com-params",
    title: "SSG com Params",
    date: "2026-05-28",
    body: "# Params\n\nAqui a rota e gerada estaticamente via `generateStaticParams`."
  }
];

export async function generateStaticParams() {
  return POSTS.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({
  params
}: {
  params: Promise<{ slug: string }>;
}): Metadata {
  // Next 15: params pode vir como Promise.
  return {
    title: "Post"
  };
}

export default async function PostPage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = POSTS.find((p) => p.slug === slug);
  if (!post) notFound();

  return (
    <main className="container">
      <a href="/posts">Voltar</a>
      <h1 style={{ marginTop: 12 }}>{post.title}</h1>
      <p style={{ opacity: 0.7 }}>{post.date}</p>
      <div className="card" style={{ whiteSpace: "pre-wrap" }}>
        {post.body}
      </div>
    </main>
  );
}

