const { test, expect } = require("@playwright/test");
const path = require("path");
const { pathToFileURL } = require("url");
const { networkPlan } = require("../src/models/network-plan");

function appUrl() {
  return pathToFileURL(path.join(__dirname, "..", "app", "index.html")).href;
}

test("intercepta API externa e bloqueia imagens pesadas com page.route", async ({ page }) => {
  await page.route("**/*.{png,jpg,jpeg,webp}", (route) => route.abort());
  await page.route("https://third-party.local/api/lessons", (route) =>
    route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({
        lessons: networkPlan.lessons.map((title) => ({
          title,
          summary: `Resumo validado para ${title}.`
        }))
      })
    })
  );

  await page.goto(appUrl());

  await expect(page.getByRole("heading", { name: "Sandbox de interceptação de rede" })).toBeVisible();
  await expect(page.locator("#hero-status")).toHaveText(networkPlan.heroFallback);

  for (const lesson of networkPlan.lessons) {
    await expect(page.getByRole("heading", { name: lesson })).toBeVisible();
  }

  await page.getByRole("button", { name: "Recarregar trilhas" }).click();
  await expect(page.getByRole("heading", { name: networkPlan.lessons[0] })).toBeVisible();
});
