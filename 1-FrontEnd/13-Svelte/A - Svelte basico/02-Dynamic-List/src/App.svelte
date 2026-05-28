<script lang="ts">
  import { fly } from "svelte/transition";
  let text = "";
  let items: Array<{ id: string; title: string }> = [];
  function id() {
    return Math.random().toString(16).slice(2);
  }
  function add() {
    const t = text.trim();
    if (!t) return;
    items = [{ id: id(), title: t }, ...items];
    text = "";
  }
  function remove(id: string) {
    items = items.filter((i) => i.id !== id);
  }
</script>

<main class="container">
  <h1>02 - Dynamic List</h1>
  <div class="card" style="display:flex; gap:8px; flex-wrap:wrap;">
    <input bind:value={text} placeholder="Novo item" style="flex:1 1 260px; padding:10px; border-radius:8px; border:1px solid rgba(255,255,255,0.14); background:rgba(255,255,255,0.06); color:inherit;" />
    <button on:click={add}>Adicionar</button>
  </div>
  <div style="height:12px;" />
  <div class="row">
    {#each items as it (it.id)}
      <div class="card" transition:fly={{ y: 8, duration: 180 }}>
        <strong>{it.title}</strong>
        <div style="margin-top:10px;">
          <button on:click={() => remove(it.id)}>Remover</button>
        </div>
      </div>
    {/each}
  </div>
</main>

