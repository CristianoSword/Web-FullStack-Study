const { test, expect } = require("@playwright/test");
const fs = require("fs");
const path = require("path");
const { pathToFileURL } = require("url");
const { navigationPlan } = require("../src/models/navigation-plan");

function pageUrl(fileName) {
  return pathToFileURL(path.join(__dirname, "..", "app", fileName)).href;
}

test("navega entre páginas e salva um trace manual do fluxo", async ({ browser }) => {
  const context = await browser.newContext();
  const tracePath = path.join(__dirname, "..", "artifacts", "navigation-trace.zip");
  fs.mkdirSync(path.dirname(tracePath), { recursive: true });

  await context.tracing.start({
    screenshots: true,
    snapshots: true,
    sources: true
  });

  const page = await context.newPage();
  await page.goto(pageUrl("index.html"));
  await page.getByRole("button", { name: `Escolher ${navigationPlan.selectedTrack}` }).click();

  await expect(page).toHaveURL(pageUrl("courses.html"));
  await expect(page.getByText(`Trilha escolhida: ${navigationPlan.selectedTrack}`)).toBeVisible();

  await page.getByRole("button", { name: "Adicionar ao resumo" }).first().click();
  await expect(page).toHaveURL(pageUrl("summary.html"));
  await expect(page.getByText(`Trilha: ${navigationPlan.selectedTrack}`)).toBeVisible();
  await expect(page.getByText(`Curso: ${navigationPlan.course}`)).toBeVisible();

  await context.tracing.stop({ path: tracePath });
  await context.close();
});
