const { deduplicateWithFilter } = require("../src/algorithms/deduplicate-with-filter.js");
const { deduplicateWithSet } = require("../src/algorithms/deduplicate-with-set.js");
const { benchmark } = require("../src/utils/benchmark.js");

function buildDataset(size) {
  return Array.from({ length: size }, (_, index) => `lesson-${index % 50}`);
}

describe("benchmark comparison", () => {
  test("keeps both algorithms functionally equivalent", () => {
    const dataset = buildDataset(500);

    expect(deduplicateWithFilter(dataset)).toEqual(deduplicateWithSet(dataset));
  });

  test("produces a duration report for each strategy", () => {
    const dataset = buildDataset(5000);

    const filterRun = benchmark("filter", () => deduplicateWithFilter(dataset));
    const setRun = benchmark("set", () => deduplicateWithSet(dataset));

    expect(filterRun.label).toBe("filter");
    expect(setRun.label).toBe("set");
    expect(filterRun.duration).toBeGreaterThanOrEqual(0);
    expect(setRun.duration).toBeGreaterThanOrEqual(0);
    expect(filterRun.result).toEqual(setRun.result);
  });
});
