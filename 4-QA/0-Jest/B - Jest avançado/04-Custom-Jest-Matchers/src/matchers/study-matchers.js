function toBeValidStudySlug(received) {
  const pass = /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(received);

  return {
    pass,
    message: () =>
      pass
        ? `Expected slug '${received}' not to be a valid study slug`
        : `Expected slug '${received}' to follow kebab-case study format`
  };
}

function toHaveProgressAbove(received, minimum) {
  const pass = typeof received?.progress === "number" && received.progress > minimum;

  return {
    pass,
    message: () =>
      pass
        ? `Expected progress ${received.progress} not to be above ${minimum}`
        : `Expected progress object to be above ${minimum}, but got ${received?.progress}`
  };
}

module.exports = {
  toBeValidStudySlug,
  toHaveProgressAbove
};
