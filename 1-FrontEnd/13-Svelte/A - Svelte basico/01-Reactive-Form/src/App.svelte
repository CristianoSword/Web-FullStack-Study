<script lang="ts">
  let name = "";
  let email = "";
  $: valid = name.trim().length >= 2 && email.includes("@");
</script>

<main class="container">
  <h1>01 - Reactive Form</h1>
  <div class="card" style="max-width:520px; display:grid; gap:10px;">
    <label>
      Nome
      <input bind:value={name} placeholder="Seu nome" style="width:100%; margin-top:6px; padding:10px; border-radius:8px; border:1px solid rgba(255,255,255,0.14); background:rgba(255,255,255,0.06); color:inherit;" />
    </label>
    <label>
      Email
      <input bind:value={email} placeholder="voce@exemplo.com" style="width:100%; margin-top:6px; padding:10px; border-radius:8px; border:1px solid rgba(255,255,255,0.14); background:rgba(255,255,255,0.06); color:inherit;" />
    </label>
    <button disabled={!valid}>Enviar</button>
    <div style="opacity:0.75">Valido: <strong>{valid ? "sim" : "nao"}</strong></div>
  </div>
</main>

