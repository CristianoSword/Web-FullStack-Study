import { describe, expect, it } from "vitest";
import { slugRules } from "../src/models/slug-rules.mjs";
import { slugify } from "../src/slugify.mjs";

describe("slugify external tests", () => {
  it("mantém o módulo válido fora do teste embutido", () => {
    expect(slugify(slugRules.sample, slugRules.separator)).toBe("vitest-in-source");
  });
});
