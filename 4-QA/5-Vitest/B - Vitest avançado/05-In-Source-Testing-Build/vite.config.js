import { defineConfig } from "vite";

export default defineConfig({
  test: {
    environment: "node",
    includeSource: ["src/**/*.mjs"]
  }
});
