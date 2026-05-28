<script lang="ts">
  type State = "idle" | "loading" | "success" | "error";
  let state: State = "idle";
  async function run() {
    state = "loading";
    await new Promise((r) => setTimeout(r, 700));
    state = Math.random() > 0.25 ? "success" : "error";
  }
</script>

<main class="container">
  <h1>State Machine</h1>
  <div class="card" style="max-width:520px; display:grid; gap:10px;">
    <div>Estado: <strong>{state}</strong></div>
    <button on:click={run} disabled={state === "loading"}>Executar</button>
  </div>
</main>

