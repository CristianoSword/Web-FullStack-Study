const { describe, expect, it } = require("vitest");
const { watchScenarios } = require("../src/models/watch-scenarios");
const { calculateSessionStatus, createWatchSummary } = require("../src/goal-session");

describe("watch mode session helpers", () => {
  it.each(watchScenarios)("recalcula rapidamente o estado enquanto o código muda", ({ completed, total, status }) => {
    expect(calculateSessionStatus(completed, total)).toBe(status);
  });

  it("gera resumo fácil de validar durante o watch", () => {
    expect(createWatchSummary("BackEnd", 3, 5)).toBe("BackEnd: 3/5 (in-progress)");
  });
});
