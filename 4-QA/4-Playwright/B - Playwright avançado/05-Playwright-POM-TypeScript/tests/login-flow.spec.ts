import { test, expect } from "@playwright/test";
import path from "path";
import { pathToFileURL } from "url";
import { LoginPage } from "../src/pages/LoginPage";
import { DashboardPage } from "../src/pages/DashboardPage";
import { studyUser } from "../src/models/study-user";

function loginUrl(): string {
  return pathToFileURL(path.join(__dirname, "..", "app", "login.html")).href;
}

test("executa login usando Page Object Model em TypeScript", async ({ page }) => {
  const loginPage = new LoginPage(page);
  const dashboardPage = new DashboardPage(page);

  await loginPage.open(loginUrl());
  await loginPage.login(studyUser.name, studyUser.track);

  await expect(dashboardPage.title).toBeVisible();
  await expect(dashboardPage.subtitle).toHaveText(
    `${studyUser.name} está estudando ${studyUser.track}.`
  );
});
