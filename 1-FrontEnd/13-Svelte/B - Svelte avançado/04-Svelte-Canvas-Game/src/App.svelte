<script lang="ts">
  import { onMount } from "svelte";
  let canvas: HTMLCanvasElement | null = null;
  let x = 40;
  let y = 40;
  let vx = 2.2;
  let vy = 1.6;
  onMount(() => {
    const c = canvas;
    if (!c) return;
    const ctx = c.getContext("2d");
    if (!ctx) return;
    let raf = 0;
    const loop = () => {
      raf = requestAnimationFrame(loop);
      ctx.clearRect(0, 0, c.width, c.height);
      x += vx;
      y += vy;
      if (x < 14 || x > c.width - 14) vx *= -1;
      if (y < 14 || y > c.height - 14) vy *= -1;
      ctx.fillStyle = "rgba(255,255,255,0.75)";
      ctx.beginPath();
      ctx.arc(x, y, 12, 0, Math.PI * 2);
      ctx.fill();
    };
    loop();
    return () => cancelAnimationFrame(raf);
  });
</script>

<main class="container">
  <h1>Canvas Game (Mini)</h1>
  <div class="card" style="max-width:620px;">
    <canvas bind:this={canvas} width="560" height="320" style="width:100%; height:auto; border-radius:8px; background:rgba(255,255,255,0.04); border:1px solid rgba(255,255,255,0.12);" />
  </div>
</main>

