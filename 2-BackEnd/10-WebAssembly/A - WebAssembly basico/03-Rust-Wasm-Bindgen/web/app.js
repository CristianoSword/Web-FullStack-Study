import init, { analyze_scores, scale_value } from "../pkg/rust_wasm_bindgen.js";
import { sampleInputs } from "./sample_inputs.js";

function renderResults(results) {
  const host = document.querySelector("#results");

  host.innerHTML = results
    .map(
      (result) => `
        <article class="card">
          <h2>${result.label}</h2>
          <p><strong>Total:</strong> ${result.total.toFixed(2)}</p>
          <p><strong>Average:</strong> ${result.average.toFixed(2)}</p>
          <p><strong>Peak:</strong> ${result.peak.toFixed(2)}</p>
          <p><strong>Scaled peak x1.5:</strong> ${scale_value(result.peak, 1.5).toFixed(2)}</p>
        </article>
      `
    )
    .join("");
}

async function bootstrap() {
  await init();
  const results = analyze_scores(sampleInputs);
  renderResults(results);
}

bootstrap();
