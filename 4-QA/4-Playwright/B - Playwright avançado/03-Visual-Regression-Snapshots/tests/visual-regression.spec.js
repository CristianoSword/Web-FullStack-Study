const { test, expect } = require("@playwright/test");
const path = require("path");
const { pathToFileURL } = require("url");
const { layoutTokens } = require("../src/models/layout-tokens");

function appUrl() {
  return pathToFileURL(path.join(__dirname, "..", "app", "index.html")).href;
}

test("compara o cartão principal contra um snapshot visual", async ({ page }) => {
  await page.goto(appUrl());

  await expect(page.getByRole("heading", { name: layoutTokens.cardTitle })).toBeVisible();
  await expect(page.locator("[data-testid='dashboard-card']")).toHaveScreenshot("dashboard-card.png", {
    animations: "disabled",
    caret: "hide"
  });
});
