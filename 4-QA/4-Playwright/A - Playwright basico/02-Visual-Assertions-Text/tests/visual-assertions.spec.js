const { test, expect } = require("@playwright/test");
const path = require("path");
const { pathToFileURL } = require("url");
const { uiCopy } = require("../src/models/ui-copy");

function appUrl() {
  return pathToFileURL(path.join(__dirname, "..", "app", "index.html")).href;
}

test("valida textos, labels e mensagens com assertions visuais do Playwright", async ({
  page
}) => {
  await page.goto(appUrl());

  await expect(page.getByRole("heading", { name: uiCopy.title })).toBeVisible();
  await expect(page.getByText(uiCopy.subtitle)).toBeVisible();
  await expect(page.getByText(uiCopy.helper)).toBeVisible();
  await expect(page.getByLabel("Email")).toHaveAttribute("placeholder", "aluno@study.dev");
  await expect(page.getByLabel("Senha")).toHaveAttribute("placeholder", "Digite sua senha");

  await page.getByRole("button", { name: "Entrar" }).click();
  await expect(page.getByRole("alert")).toContainText(uiCopy.emptyEmail);
  await expect(page.getByRole("alert")).toContainText(uiCopy.emptyPassword);
  await expect(page.getByRole("alert")).toContainText(uiCopy.terms);

  await page.getByLabel("Email").fill("aluno@study.dev");
  await page.getByLabel("Senha").fill("Segredo123");
  await page.getByLabel("Salvar sessão neste dispositivo").check();
  await page.getByRole("button", { name: "Entrar" }).click();

  await expect(page.getByRole("alert")).toHaveText(uiCopy.success);
});
