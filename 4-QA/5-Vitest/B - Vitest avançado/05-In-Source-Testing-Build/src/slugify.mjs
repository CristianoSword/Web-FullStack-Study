export function slugify(value, separator = "-") {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, separator)
    .replace(new RegExp(`${separator}+`, "g"), separator)
    .replace(new RegExp(`^${separator}|${separator}$`, "g"), "");
}

if (import.meta.vitest) {
  const { describe, expect, it } = import.meta.vitest;

  describe("in-source slugify tests", () => {
    it("gera slug simples dentro do próprio arquivo fonte", () => {
      expect(slugify("Rabbit MQ Roadmap")).toBe("rabbit-mq-roadmap");
    });
  });
}
