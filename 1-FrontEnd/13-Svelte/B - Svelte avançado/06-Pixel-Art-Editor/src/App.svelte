<script lang="ts">
  type Tool = "pencil" | "eraser" | "fill" | "picker";

  const palette = [
    "#111827",
    "#ffffff",
    "#ef4444",
    "#f97316",
    "#facc15",
    "#22c55e",
    "#14b8a6",
    "#38bdf8",
    "#2563eb",
    "#7c3aed",
    "#db2777",
    "#78716c"
  ];

  const transparent = "transparent";
  const exportScale = 16;

  let gridSize = 24;
  let pixelZoom = 18;
  let showGrid = true;
  let tool: Tool = "pencil";
  let activeColor = "#2563eb";
  let customColor = activeColor;
  let pixels = createPixels(gridSize);
  let past: string[][] = [];
  let future: string[][] = [];
  let strokeStart: string[] | null = null;
  let strokeChanged = false;
  let isDrawing = false;
  let previewCanvas: HTMLCanvasElement | null = null;

  $: filledPixels = pixels.filter((pixel) => pixel !== transparent).length;
  $: uniqueColors = new Set(pixels.filter((pixel) => pixel !== transparent)).size;
  $: if (previewCanvas) {
    pixels;
    gridSize;
    paintPreview();
  }

  function createPixels(size: number) {
    return Array.from({ length: size * size }, () => transparent);
  }

  function resetCanvas(size = gridSize) {
    gridSize = size;
    pixels = createPixels(size);
    past = [];
    future = [];
    isDrawing = false;
    strokeStart = null;
    strokeChanged = false;
  }

  function resizeCanvas() {
    resetCanvas(Number(gridSize));
  }

  function commitFrom(before: string[] | null, nextPixels: string[]) {
    if (!before) return;
    if (before.join("|") === nextPixels.join("|")) return;
    past = [...past, before].slice(-40);
    future = [];
  }

  function setPixel(index: number, color: string) {
    if (pixels[index] === color) return false;
    const next = [...pixels];
    next[index] = color;
    pixels = next;
    return true;
  }

  function beginStroke(index: number) {
    if (tool === "picker") {
      const picked = pixels[index];
      if (picked !== transparent) {
        activeColor = picked;
        customColor = picked;
      }
      return;
    }

    const before = [...pixels];
    if (tool === "fill") {
      const next = floodFill(index, toolColor());
      commitFrom(before, next);
      pixels = next;
      return;
    }

    isDrawing = true;
    strokeStart = before;
    strokeChanged = paintIndex(index);
  }

  function continueStroke(index: number) {
    if (!isDrawing || (tool !== "pencil" && tool !== "eraser")) return;
    strokeChanged = paintIndex(index) || strokeChanged;
  }

  function endStroke() {
    if (isDrawing && strokeChanged) {
      commitFrom(strokeStart, pixels);
    }
    isDrawing = false;
    strokeStart = null;
    strokeChanged = false;
  }

  function paintIndex(index: number) {
    return setPixel(index, toolColor());
  }

  function toolColor() {
    return tool === "eraser" ? transparent : activeColor;
  }

  function floodFill(start: number, color: string) {
    const target = pixels[start];
    if (target === color) return pixels;

    const next = [...pixels];
    const stack = [start];
    const visited = new Set<number>();

    while (stack.length) {
      const index = stack.pop();
      if (index === undefined || visited.has(index)) continue;
      visited.add(index);
      if (next[index] !== target) continue;

      next[index] = color;
      const x = index % gridSize;
      const y = Math.floor(index / gridSize);
      if (x > 0) stack.push(index - 1);
      if (x < gridSize - 1) stack.push(index + 1);
      if (y > 0) stack.push(index - gridSize);
      if (y < gridSize - 1) stack.push(index + gridSize);
    }

    return next;
  }

  function undo() {
    const previous = past[past.length - 1];
    if (!previous) return;
    future = [pixels, ...future].slice(0, 40);
    pixels = previous;
    past = past.slice(0, -1);
  }

  function redo() {
    const next = future[0];
    if (!next) return;
    past = [...past, pixels].slice(-40);
    pixels = next;
    future = future.slice(1);
  }

  function clearCanvas() {
    const before = [...pixels];
    const next = createPixels(gridSize);
    commitFrom(before, next);
    pixels = next;
  }

  function paintPreview() {
    const canvas = previewCanvas;
    if (!canvas) return;
    drawPixelsToCanvas(canvas, 6);
  }

  function drawPixelsToCanvas(canvas: HTMLCanvasElement, scale: number) {
    canvas.width = gridSize * scale;
    canvas.height = gridSize * scale;
    const context = canvas.getContext("2d");
    if (!context) return;
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.imageSmoothingEnabled = false;

    pixels.forEach((color, index) => {
      if (color === transparent) return;
      const x = index % gridSize;
      const y = Math.floor(index / gridSize);
      context.fillStyle = color;
      context.fillRect(x * scale, y * scale, scale, scale);
    });
  }

  function exportPng() {
    const canvas = document.createElement("canvas");
    drawPixelsToCanvas(canvas, exportScale);

    const link = document.createElement("a");
    link.download = `pixel-art-${gridSize}x${gridSize}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  }
</script>

<svelte:window on:pointerup={endStroke} on:pointerleave={endStroke} />

<main class="app">
  <section class="brand">
    <div>
      <h1>Pixel Art Studio</h1>
      <p>Editor de pixel art em Svelte com desenho por arraste, balde, conta-gotas, historico e exportacao PNG.</p>
    </div>
    <div class="button-row">
      <button class="btn" on:click={undo} disabled={past.length === 0}>Undo</button>
      <button class="btn" on:click={redo} disabled={future.length === 0}>Redo</button>
      <button class="btn primary" on:click={exportPng}>Salvar PNG</button>
    </div>
  </section>

  <section class="shell">
    <aside class="panel">
      <div class="panel-header">
        <h2 class="panel-title">Ferramentas</h2>
      </div>
      <div class="panel-body">
        <div class="button-row" aria-label="Ferramentas de desenho">
          <button class="btn" aria-pressed={tool === "pencil"} on:click={() => (tool = "pencil")}>Pencil</button>
          <button class="btn" aria-pressed={tool === "eraser"} on:click={() => (tool = "eraser")}>Eraser</button>
          <button class="btn" aria-pressed={tool === "fill"} on:click={() => (tool = "fill")}>Fill</button>
          <button class="btn" aria-pressed={tool === "picker"} on:click={() => (tool = "picker")}>Picker</button>
        </div>

        <div style="height: 18px"></div>

        <label class="field">
          <span>Tamanho</span>
          <select bind:value={gridSize} on:change={resizeCanvas}>
            <option value={16}>16 x 16</option>
            <option value={24}>24 x 24</option>
            <option value={32}>32 x 32</option>
            <option value={48}>48 x 48</option>
          </select>
        </label>

        <label class="field">
          <span>Zoom</span>
          <input type="range" min="10" max="28" bind:value={pixelZoom} />
        </label>

        <label class="field">
          <span>Cor ativa</span>
          <input
            type="color"
            bind:value={customColor}
            on:input={() => (activeColor = customColor)}
          />
        </label>

        <div class="field">
          <span>Paleta</span>
          <div class="palette">
            {#each palette as color}
              <button
                class="swatch"
                style={`background:${color}`}
                aria-label={`Selecionar ${color}`}
                aria-pressed={activeColor === color}
                on:click={() => {
                  activeColor = color;
                  customColor = color;
                }}
              ></button>
            {/each}
          </div>
        </div>

        <div class="button-row">
          <button class="btn" aria-pressed={showGrid} on:click={() => (showGrid = !showGrid)}>Grid</button>
          <button class="btn danger" on:click={clearCanvas}>Limpar</button>
        </div>
      </div>
    </aside>

    <section class="panel">
      <div class="panel-header">
        <h2 class="panel-title">{gridSize} x {gridSize}</h2>
        <span style="color:#627089; font-size:12px; font-weight:800;">{tool}</span>
      </div>
      <div class="panel-body">
        <div class="stage">
          <div class="canvas-frame">
            <div
              class="pixel-grid"
              style={`grid-template-columns: repeat(${gridSize}, var(--pixel-size)); --pixel-size: ${pixelZoom}px;`}
            >
              {#each pixels as color, index}
                <button
                  class:hide-lines={!showGrid}
                  class="pixel"
                  aria-label={`Pixel ${index + 1}`}
                  style={`background:${color === transparent ? "transparent" : color}`}
                  on:pointerdown={() => beginStroke(index)}
                  on:pointerenter={() => continueStroke(index)}
                ></button>
              {/each}
            </div>
          </div>
        </div>
      </div>
    </section>

    <aside class="panel right-panel">
      <div class="panel-header">
        <h2 class="panel-title">Preview</h2>
      </div>
      <div class="panel-body">
        <canvas class="preview" bind:this={previewCanvas}></canvas>

        <div class="stat-grid">
          <div class="stat">
            <span>Pixels</span>
            <strong>{filledPixels}</strong>
          </div>
          <div class="stat">
            <span>Cores</span>
            <strong>{uniqueColors}</strong>
          </div>
          <div class="stat">
            <span>Undo</span>
            <strong>{past.length}</strong>
          </div>
          <div class="stat">
            <span>Redo</span>
            <strong>{future.length}</strong>
          </div>
        </div>

        <div style="height: 14px"></div>
        <button class="btn primary" style="width:100%" on:click={exportPng}>Exportar PNG {gridSize * exportScale}px</button>
      </div>
    </aside>
  </section>
</main>
