const { performance } = require("perf_hooks");

function benchmark(label, fn) {
  const start = performance.now();
  const result = fn();
  const end = performance.now();

  return {
    label,
    result,
    duration: Number((end - start).toFixed(3))
  };
}

module.exports = {
  benchmark
};
