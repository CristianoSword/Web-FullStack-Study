const { test, expect } = require("@playwright/test");
const path = require("path");
const { pathToFileURL } = require("url");
const { sessionUsers } = require("../src/models/session-users");

function appUrl() {
  return pathToFileURL(path.join(__dirname, "..", "app", "index.html")).href;
}

test("mantém duas sessões privadas isoladas em contexts diferentes", async ({ browser }) => {
  const firstContext = await browser.newContext();
  const secondContext = await browser.newContext();
  const firstPage = await firstContext.newPage();
  const secondPage = await secondContext.newPage();

  const [alice, bruno] = sessionUsers;

  await firstPage.goto(appUrl());
  await firstPage.getByLabel("Nome").fill(alice.name);
  await firstPage.getByLabel("Trilha").selectOption(alice.track);
  await firstPage.getByRole("button", { name: "Salvar sessão" }).click();

  await secondPage.goto(appUrl());
  await secondPage.getByLabel("Nome").fill(bruno.name);
  await secondPage.getByLabel("Trilha").selectOption(bruno.track);
  await secondPage.getByRole("button", { name: "Salvar sessão" }).click();

  await expect(firstPage.locator("#welcome")).toHaveText(`Sessão ativa de ${alice.name}`);
  await expect(firstPage.locator("#selected-track")).toHaveText(`Trilha atual: ${alice.track}`);
  await expect(secondPage.locator("#welcome")).toHaveText(`Sessão ativa de ${bruno.name}`);
  await expect(secondPage.locator("#selected-track")).toHaveText(`Trilha atual: ${bruno.track}`);

  await firstPage.reload();
  await secondPage.reload();

  await expect(firstPage.locator("#welcome")).toHaveText(`Sessão ativa de ${alice.name}`);
  await expect(secondPage.locator("#welcome")).toHaveText(`Sessão ativa de ${bruno.name}`);
  await expect(firstPage.locator("#welcome")).not.toContainText(bruno.name);

  await firstContext.close();
  await secondContext.close();
});
