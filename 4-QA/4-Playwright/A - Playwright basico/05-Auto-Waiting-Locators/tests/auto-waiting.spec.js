const { test, expect } = require("@playwright/test");
const path = require("path");
const { pathToFileURL } = require("url");
const { loadingStates } = require("../src/models/loading-states");

function appUrl() {
  return pathToFileURL(path.join(__dirname, "..", "app", "index.html")).href;
}

test("espera automaticamente por mudanças de estado sem timeouts manuais", async ({
  page
}) => {
  await page.goto(appUrl());

  await expect(page.getByTestId("status-pill")).toHaveText(loadingStates.initial);
  await page.getByRole("button", { name: "Iniciar sincronizacao" }).click();
  await expect(page.getByTestId("status-pill")).toHaveText(loadingStates.done);
  await expect(page.getByRole("heading", { name: "Aulas sincronizadas" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Abrir plano de estudo" })).toBeVisible();

  await page.getByRole("button", { name: "Abrir plano de estudo" }).click();
  await expect(page.getByRole("heading", { name: loadingStates.readyTitle })).toBeVisible();
});
