import type { Locator, Page } from "@playwright/test";

export class DashboardPage {
  readonly page: Page;
  readonly title: Locator;
  readonly subtitle: Locator;

  constructor(page: Page) {
    this.page = page;
    this.title = page.getByRole("heading", { name: "Dashboard do aluno" });
    this.subtitle = page.locator("#student-copy");
  }
}
