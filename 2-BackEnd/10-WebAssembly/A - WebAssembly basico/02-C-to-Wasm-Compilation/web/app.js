import createMetricsModule from "../dist/math_metrics.js";
import { metricJobs } from "./metric_jobs.js";

function writeIntArray(module, values) {
  const pointer = module._malloc(values.length * Int32Array.BYTES_PER_ELEMENT);
  module.HEAP32.set(values, pointer / Int32Array.BYTES_PER_ELEMENT);
  return pointer;
}

function readMetrics(module, job) {
  const valuesPointer = writeIntArray(module, Int32Array.from(job.values));
  const weightsPointer = writeIntArray(module, Int32Array.from(job.weights));

  const total = module._sum_range(valuesPointer, job.values.length);
  const average = module._weighted_average(valuesPointer, weightsPointer, job.values.length);
  const clamped = module._clamp_score(job.clamp.value, job.clamp.min, job.clamp.max);

  module._free(valuesPointer);
  module._free(weightsPointer);

  return { total, average, clamped };
}

function renderResults(container, results) {
  container.innerHTML = results
    .map(
      ({ label, total, average, clamped }) => `
        <article class="card">
          <h2>${label}</h2>
          <p><strong>Total:</strong> ${total}</p>
          <p><strong>Weighted average:</strong> ${average.toFixed(2)}</p>
          <p><strong>Clamped score:</strong> ${clamped}</p>
        </article>
      `
    )
    .join("");
}

const resultsContainer = document.querySelector("#results");

createMetricsModule().then((module) => {
  const results = metricJobs.map((job) => ({ label: job.label, ...readMetrics(module, job) }));
  renderResults(resultsContainer, results);
});
