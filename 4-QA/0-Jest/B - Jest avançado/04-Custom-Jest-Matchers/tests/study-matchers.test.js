const { createProgressReport } = require("../src/models/progress-report.js");

describe("custom jest matchers", () => {
  test("validates study slugs semantically", () => {
    expect("jest-advanced").toBeValidStudySlug();
  });

  test("checks progress with domain language", () => {
    expect(createProgressReport("QA", 8, 10)).toHaveProgressAbove(70);
  });

  test("fails for invalid slugs", () => {
    expect(() => expect("Jest Advanced").toBeValidStudySlug()).toThrow();
  });
});
