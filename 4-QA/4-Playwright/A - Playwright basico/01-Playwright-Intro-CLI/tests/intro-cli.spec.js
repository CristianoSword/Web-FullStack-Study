const { test, expect } = require("@playwright/test");
const path = require("path");
const { pathToFileURL } = require("url");
const { trackCatalog } = require("../src/models/track-catalog");

function appUrl() {
  return pathToFileURL(path.join(__dirname, "..", "app", "index.html")).href;
}

test("navega por filtros e valida a trilha aberta com seletores estilo codegen", async ({
  page
}) => {
  await page.goto(appUrl());

  await expect(
    page.getByRole("heading", { name: "Catálogo de trilhas para gravar fluxos com Codegen" })
  ).toBeVisible();

  await page.getByRole("button", { name: "BackEnd" }).click();
  await expect(page.getByRole("heading", { name: "BackEnd" })).toBeVisible();
  await expect(page.getByText("18 aulas planejadas")).toBeVisible();

  await page.getByRole("button", { name: "Todas" }).click();
  await page.getByRole("button", { name: "Abrir trilha", exact: true }).nth(2).click();

  const qaTrack = trackCatalog.find((track) => track.slug === "qa");
  await expect(page.locator("#details-name")).toContainText(qaTrack.name);
  await expect(page.locator("#details-focus")).toHaveText(qaTrack.focus);
  await expect(page.locator("#details-lessons")).toHaveText(`${qaTrack.lessons} aulas planejadas`);
});
