const { toBeValidStudySlug, toHaveProgressAbove } = require("../src/matchers/study-matchers.js");

expect.extend({
  toBeValidStudySlug,
  toHaveProgressAbove
});
