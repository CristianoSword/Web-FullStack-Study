<script lang="ts">
  import { tweened } from "svelte/motion";
  import { cubicOut } from "svelte/easing";
  const t = tweened(0, { duration: 450, easing: cubicOut });
  function bump() {
    t.set(1);
    setTimeout(() => t.set(0), 20);
  }
</script>

<main class="container">
  <h1>Complex Transition (Mini)</h1>
  <div class="card" style="max-width:520px;">
    <button on:click={bump}>Animar</button>
    <div style="margin-top:12px; height:10px; background:rgba(255,255,255,0.08); border-radius:999px;">
      <div style="height:100%; width:{($t * 100).toFixed(0)}%; background:rgba(255,255,255,0.35); border-radius:999px;"></div>
    </div>
  </div>
</main>

