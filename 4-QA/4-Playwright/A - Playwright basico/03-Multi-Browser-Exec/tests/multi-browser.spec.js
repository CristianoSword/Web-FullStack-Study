const { test, expect } = require("@playwright/test");
const path = require("path");
const { pathToFileURL } = require("url");
const { browserMatrix } = require("../src/models/browser-matrix");

function appUrl(browserName) {
  const target = new URL(pathToFileURL(path.join(__dirname, "..", "app", "index.html")).href);
  target.searchParams.set("browser", browserName);
  return target.toString();
}

test("executa o mesmo fluxo nas engines configuradas", async ({ page }, testInfo) => {
  await page.goto(appUrl(testInfo.project.name));

  await expect(page.getByRole("heading", { name: "Execução multi-browser para o portal de estudos" })).toBeVisible();
  await expect(page.locator("#browser-copy")).toHaveText(`Projeto atual: ${testInfo.project.name}`);

  for (const moduleName of browserMatrix.modules) {
    await expect(page.getByRole("heading", { name: moduleName })).toBeVisible();
  }

  expect(browserMatrix.supportedProjects).toContain(testInfo.project.name);
});
