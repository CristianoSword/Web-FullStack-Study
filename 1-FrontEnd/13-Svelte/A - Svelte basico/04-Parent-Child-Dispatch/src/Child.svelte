<script lang="ts">
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher<{ ping: { msg: string } }>();
  let count = 0;
  function ping() {
    count += 1;
    dispatch("ping", { msg: "ping #" + count + " @ " + new Date().toLocaleTimeString() });
  }
</script>

<div style="display:grid; gap:10px;">
  <strong>Child</strong>
  <button on:click={ping}>Disparar evento</button>
</div>

