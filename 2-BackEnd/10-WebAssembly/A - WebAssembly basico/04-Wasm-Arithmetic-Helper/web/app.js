import createArithmeticModule from "../dist/arithmetic_helper.js";
import { arithmeticJobs } from "./jobs.js";

function writeFloatArray(module, values) {
  const pointer = module._malloc(values.length * Float64Array.BYTES_PER_ELEMENT);
  module.HEAPF64.set(values, pointer / Float64Array.BYTES_PER_ELEMENT);
  return pointer;
}

function flattenMatrix(matrix) {
  return matrix.flatMap((row) => row);
}

function runJob(module, job) {
  const leftPointer = writeFloatArray(module, Float64Array.from(job.left));
  const rightPointer = writeFloatArray(module, Float64Array.from(job.right));
  const matrixPointer = writeFloatArray(module, Float64Array.from(flattenMatrix(job.matrix)));

  const dotProduct = module._vector_dot_product(leftPointer, rightPointer, job.left.length);
  const trace = module._matrix_trace(matrixPointer, job.matrix.length);
  const normalized = module._normalize_score(job.score.value, job.score.min, job.score.max);

  module._free(leftPointer);
  module._free(rightPointer);
  module._free(matrixPointer);

  return { dotProduct, trace, normalized };
}

function render(container, results) {
  container.innerHTML = results
    .map(
      ({ label, dotProduct, trace, normalized }) => `
        <article class="card">
          <h2>${label}</h2>
          <p><strong>Dot product:</strong> ${dotProduct.toFixed(2)}</p>
          <p><strong>Matrix trace:</strong> ${trace.toFixed(2)}</p>
          <p><strong>Normalized score:</strong> ${normalized.toFixed(2)}%</p>
        </article>
      `
    )
    .join("");
}

createArithmeticModule().then((module) => {
  const results = arithmeticJobs.map((job) => ({ label: job.label, ...runJob(module, job) }));
  render(document.querySelector("#results"), results);
});
