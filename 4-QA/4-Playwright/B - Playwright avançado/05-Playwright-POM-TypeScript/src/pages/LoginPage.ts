import type { Locator, Page } from "@playwright/test";

export class LoginPage {
  readonly page: Page;
  readonly nameInput: Locator;
  readonly trackInput: Locator;
  readonly submitButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.nameInput = page.getByLabel("Nome");
    this.trackInput = page.getByLabel("Trilha");
    this.submitButton = page.getByRole("button", { name: "Entrar no dashboard" });
  }

  async open(url: string): Promise<void> {
    await this.page.goto(url);
  }

  async login(name: string, track: string): Promise<void> {
    await this.nameInput.fill(name);
    await this.trackInput.fill(track);
    await this.submitButton.click();
  }
}
