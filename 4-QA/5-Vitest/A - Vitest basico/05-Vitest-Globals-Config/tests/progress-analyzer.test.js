const { tolerances } = require("../src/models/tolerances");
const { classifyProgress } = require("../src/progress-analyzer");

describe("globals config", () => {
  test("usa describe/test/expect sem importar os helpers", () => {
    expect(globalThis.qaTarget).toBe(80);
    expect(classifyProgress(84, tolerances.target, tolerances.warningGap)).toBe("healthy");
    expect(classifyProgress(74, tolerances.target, tolerances.warningGap)).toBe("warning");
    expect(classifyProgress(55, tolerances.target, tolerances.warningGap)).toBe("critical");
  });
});
