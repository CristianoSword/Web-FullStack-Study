const { describe, expect, it } = require("vitest");
const { mathCases } = require("../src/models/math-cases");
const { average, safeDivide, sum } = require("../src/math-utils");

describe("math utils", () => {
  it.each(mathCases)("resolve operações básicas", ({ a, b, sum: expectedSum, average: expectedAverage }) => {
    expect(sum(a, b)).toBe(expectedSum);
    expect(average(a, b)).toBe(expectedAverage);
  });

  it("valida divisão por zero", () => {
    expect(() => safeDivide(10, 0)).toThrow("Divider cannot be zero.");
  });
});
