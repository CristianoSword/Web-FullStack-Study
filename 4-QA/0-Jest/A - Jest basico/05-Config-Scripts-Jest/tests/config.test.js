const { buildStudySummary } = require("../src/utils/build-study-summary.js");
const { normalizeTrackName } = require("../src/utils/normalize-track-name.js");

describe("Jest config and scripts", () => {
  test("bootstraps global setup before tests", () => {
    expect(globalThis.TEST_BOOTSTRAPPED).toBe(true);
  });

  test("builds a progress summary", () => {
    expect(buildStudySummary("QA", 4, 5)).toEqual({
      track: "QA",
      completed: 4,
      total: 5,
      progress: 80
    });
  });

  test("normalizes track names", () => {
    expect(normalizeTrackName("  Jest Advanced  ")).toBe("jest-advanced");
  });
});
