const { describe, expect, it } = require("vitest");
const { requestOptions } = require("../src/models/request-options");
const { fetchModule } = require("../src/async-module-service");

describe("fetchModule", () => {
  it("resolve dados assíncronos com await", async () => {
    await expect(fetchModule(requestOptions.validSlug, requestOptions.delayMs)).resolves.toEqual({
      name: "Queues",
      level: "advanced"
    });
  });

  it("rejeita quando o módulo não existe", async () => {
    await expect(fetchModule(requestOptions.invalidSlug, requestOptions.delayMs)).rejects.toThrow(
      "Module not found."
    );
  });
});
