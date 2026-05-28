<script lang="ts">
  import Child from "./Child.svelte";
  let last = "";
  function onPing(e: CustomEvent<{ msg: string }>) {
    last = e.detail.msg;
  }
</script>

<main class="container">
  <h1>04 - Parent / Child Dispatch</h1>
  <div class="row">
    <div class="card">
      <Child on:ping={onPing} />
    </div>
    <div class="card">
      <strong>Ultimo evento</strong>
      <div style="margin-top:8px; opacity:0.75">{last || "-"}</div>
    </div>
  </div>
</main>

