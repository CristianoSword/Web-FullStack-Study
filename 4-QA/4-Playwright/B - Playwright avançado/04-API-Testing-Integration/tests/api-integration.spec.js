const { test, expect } = require("@playwright/test");
const { startStudyServer } = require("../src/test-server");

test("combina chamadas HTTP diretas com validação da UI", async ({ page, request }) => {
  const server = await startStudyServer();

  try {
    const healthResponse = await request.get(`${server.baseUrl}/api/health`);
    expect(healthResponse.ok()).toBeTruthy();

    const reviewResponse = await request.post(`${server.baseUrl}/api/modules/review`, {
      data: { id: 2 }
    });
    expect(reviewResponse.ok()).toBeTruthy();

    await page.goto(`${server.baseUrl}/index.html`);
    await expect(page.getByRole("heading", { name: "Portal misto de API e UI" })).toBeVisible();
    await expect(page.getByText("Status: Revisado")).toBeVisible();

    await page.getByRole("button", { name: "Atualizar módulos" }).click();
    await expect(page.getByText("Módulos carregados: 3")).toBeVisible();
  } finally {
    await server.close();
  }
});
