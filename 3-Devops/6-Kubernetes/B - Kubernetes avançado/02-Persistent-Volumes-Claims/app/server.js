import express from "express";
import { mkdir, readFile, writeFile } from "node:fs/promises";

const app = express();
const port = Number(process.env.PORT || 8080);
const dataDirectory = process.env.DATA_DIRECTORY || "/data";
const dataFile = `${dataDirectory}/notes.json`;

app.use(express.json());

async function ensureStore() {
  await mkdir(dataDirectory, { recursive: true });

  try {
    await readFile(dataFile, "utf8");
  } catch {
    await writeFile(dataFile, JSON.stringify({ notes: [] }, null, 2));
  }
}

async function loadStore() {
  await ensureStore();
  return JSON.parse(await readFile(dataFile, "utf8"));
}

app.get("/healthz", async (_request, response) => {
  await ensureStore();
  response.json({ status: "ok", file: dataFile });
});

app.get("/notes", async (_request, response) => {
  response.json(await loadStore());
});

app.post("/notes", async (request, response) => {
  const store = await loadStore();
  const note = {
    id: `note-${store.notes.length + 1}`,
    text: request.body?.text || "empty",
    createdAt: new Date().toISOString()
  };

  store.notes.push(note);
  await writeFile(dataFile, JSON.stringify(store, null, 2));
  response.status(201).json(note);
});

app.listen(port, async () => {
  await ensureStore();
  console.log(`notes-api listening on ${port}`);
});
