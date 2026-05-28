<script lang="ts">
  import { count } from "./store";
</script>

<main class="container">
  <h1>05 - Store Subscriber</h1>
  <div class="card" style="max-width:520px; display:grid; gap:10px;">
    <div style="font-size:42px; font-weight:700">{$count}</div>
    <div style="display:flex; gap:8px; flex-wrap:wrap;">
      <button on:click={() => count.update((n) => n - 1)}>-1</button>
      <button on:click={() => count.update((n) => n + 1)}>+1</button>
      <button on:click={() => count.set(0)}>reset</button>
    </div>
  </div>
</main>

