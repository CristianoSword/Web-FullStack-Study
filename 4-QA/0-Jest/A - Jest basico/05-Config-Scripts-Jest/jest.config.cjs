module.exports = {
  testEnvironment: "node",
  roots: ["<rootDir>/tests"],
  collectCoverageFrom: ["src/**/*.js"],
  setupFilesAfterEnv: ["<rootDir>/test/setup.js"],
  coverageThreshold: {
    global: {
      lines: 80,
      functions: 80
    }
  }
};
