<script lang="ts">
  let a = 0;
  let b = 0;
  $: sum = a + b;
  $: diff = a - b;
  $: prod = a * b;
  $: div = b === 0 ? null : a / b;
</script>

<main class="container">
  <h1>03 - Simple Calculator</h1>
  <div class="card" style="max-width:520px; display:grid; gap:10px;">
    <label>
      A
      <input type="number" bind:value={a} style="width:100%; margin-top:6px; padding:10px; border-radius:8px; border:1px solid rgba(255,255,255,0.14); background:rgba(255,255,255,0.06); color:inherit;" />
    </label>
    <label>
      B
      <input type="number" bind:value={b} style="width:100%; margin-top:6px; padding:10px; border-radius:8px; border:1px solid rgba(255,255,255,0.14); background:rgba(255,255,255,0.06); color:inherit;" />
    </label>
    <div class="row">
      <div class="card"><strong>+</strong> {sum}</div>
      <div class="card"><strong>-</strong> {diff}</div>
      <div class="card"><strong>*</strong> {prod}</div>
      <div class="card"><strong>/</strong> {div ?? "inf"}</div>
    </div>
  </div>
</main>

