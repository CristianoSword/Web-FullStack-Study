import { watJobs } from "./jobs.js";
import { exportedFunctions } from "./module_exports.js";
import { validateJob } from "./validator.js";

async function loadModule() {
  const response = await fetch("../dist/handwritten_math.wasm");
  const bytes = await response.arrayBuffer();
  const { instance } = await WebAssembly.instantiate(bytes);
  return instance.exports;
}

function runJobs(exportsObject) {
  return watJobs.map((job) => {
    const validationError = validateJob(job);

    if (validationError) {
      return {
        label: job.label,
        exportName: job.exportName,
        description: exportedFunctions[job.exportName]?.description ?? "n/a",
        args: job.args,
        result: "error",
        error: validationError
      };
    }

    const fn = exportsObject[job.exportName];
    const result = fn(...job.args);

    return {
      label: job.label,
      exportName: job.exportName,
      description: exportedFunctions[job.exportName].description,
      args: job.args,
      result,
      error: null
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
          <p><strong>Error:</strong> ${job.error ?? "none"}</p>
        </article>
      `
    )
    .join("");
}

loadModule()
  .then((exportsObject) => {
    render(runJobs(exportsObject));
  })
  .catch((error) => {
    document.querySelector("#results").innerHTML = `<p><strong>Module load error:</strong> ${error.message}</p>`;
  });
