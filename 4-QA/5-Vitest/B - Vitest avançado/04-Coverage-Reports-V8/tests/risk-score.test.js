const { describe, expect, it } = require("vitest");
const { coverageRules } = require("../src/models/coverage-rules");
const { buildCoverageMessage, classifyRisk } = require("../src/risk-score");

describe("coverage reports v8", () => {
  it.each(coverageRules)("cobre branches de classificação", ({ score, category }) => {
    expect(classifyRisk(score)).toBe(category);
  });

  it("gera mensagem amigável de cobertura", () => {
    expect(buildCoverageMessage(95)).toBe("Coverage 95%: healthy");
  });
});
