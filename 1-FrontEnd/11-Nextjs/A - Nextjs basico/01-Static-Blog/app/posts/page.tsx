type Post = { slug: string; title: string; date: string };

const POSTS: Post[] = [
  { slug: "ola-next", title: "Ola Next.js", date: "2026-05-28" },
  { slug: "ssg-com-params", title: "SSG com Params", date: "2026-05-28" }
];

export default function PostsPage() {
  return (
    <main className="container">
      <h1>Posts</h1>
      <div className="row">
        {POSTS.map((p) => (
          <a key={p.slug} className="card" href={`/posts/${p.slug}`}>
            <strong>{p.title}</strong>
            <div style={{ opacity: 0.7, marginTop: 8 }}>{p.date}</div>
          </a>
        ))}
      </div>
    </main>
  );
}

