import { cookies } from "next/headers";

export default async function MePage() {
  const session = (await cookies()).get("mock_session")?.value ?? "";
  const email = session ? Buffer.from(session, "base64").toString("utf8") : null;

  return (
    <main className="container">
      <h1>Meu Perfil</h1>
      <div className="card">
        <div>
          <strong>Status:</strong> {email ? "logado" : "deslogado"}
        </div>
        <div style={{ marginTop: 8 }}>
          <strong>Email:</strong> {email ?? "-"}
        </div>
      </div>
    </main>
  );
}

