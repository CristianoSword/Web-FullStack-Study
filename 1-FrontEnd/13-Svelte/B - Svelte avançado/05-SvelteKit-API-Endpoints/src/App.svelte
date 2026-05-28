<script lang="ts">
  let data: any = null;
  async function load() {
    // Mock: em SvelteKit, isso seria um endpoint /api.
    data = { ok: true, at: new Date().toISOString() };
  }
</script>

<main class="container">
  <h1>SvelteKit API Endpoints (Mock)</h1>
  <div class="card" style="max-width:520px; display:grid; gap:10px;">
    <button on:click={load}>Simular request</button>
    <pre style="margin:0;">{JSON.stringify(data, null, 2)}</pre>
  </div>
</main>

