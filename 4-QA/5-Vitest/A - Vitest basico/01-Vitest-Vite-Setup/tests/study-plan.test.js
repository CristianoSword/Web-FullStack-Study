import { describe, expect, it } from "vitest";
import { buildStudyPlan } from "../src/study-plan.js";
import { modulePlan } from "../src/models/module-plan.js";

describe("buildStudyPlan", () => {
  it("soma aulas e gera resumo para o app Vite", () => {
    expect(buildStudyPlan(modulePlan)).toEqual({
      totalLessons: 13,
      summary: "API, Queue, Observability em 13 aulas"
    });
  });
});
