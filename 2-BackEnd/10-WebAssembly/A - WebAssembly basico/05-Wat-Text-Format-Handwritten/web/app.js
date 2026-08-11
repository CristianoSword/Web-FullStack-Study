import { watJobs } from "./jobs.js";
import { exportedFunctions } from "./module_exports.js";

async function loadModule() {
  const response = await fetch("../dist/handwritten_math.wasm");
  const bytes = await response.arrayBuffer();
  const { instance } = await WebAssembly.instantiate(bytes);
  return instance.exports;
}

function runJobs(exportsObject) {
  return watJobs.map((job) => {
    const fn = exportsObject[job.exportName];
    const result = fn(...job.args);

    return {
      label: job.label,
      exportName: job.exportName,
      description: exportedFunctions[job.exportName].description,
      args: job.args,
      result
    };
  });
}

function render(results) {
  document.querySelector("#results").innerHTML = results
    .map(
      (job) => `
        <article class="card">
          <h2>${job.label}</h2>
          <p><strong>Export:</strong> ${job.exportName}</p>
          <p><strong>Description:</strong> ${job.description}</p>
          <p><strong>Args:</strong> ${job.args.join(", ")}</p>
          <p><strong>Result:</strong> ${job.result}</p>
        </article>
      `
    )
    .join("");
}

loadModule().then((exportsObject) => {
  render(runJobs(exportsObject));
});
