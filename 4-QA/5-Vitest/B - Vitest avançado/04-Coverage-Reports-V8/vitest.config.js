module.exports = {
  test: {
    environment: "node",
    coverage: {
      provider: "v8",
      reporter: ["text", "html"],
      thresholds: {
        statements: 90,
        functions: 90,
        lines: 90
      }
    }
  }
};
