const path = require("node:path");
const { Builder } = require("selenium-webdriver");
const { LoginPage } = require("./pages/login-page.js");
const { DashboardPage } = require("./pages/dashboard-page.js");

async function run() {
  const driver = await new Builder().forBrowser("chrome").build();

  try {
    const loginUrl = `file:///${path.join(__dirname, "..", "app", "login.html").replace(/\\/g, "/")}`;
    const loginPage = new LoginPage(driver);
    const dashboardPage = new DashboardPage(driver);

    await loginPage.open(loginUrl);
    await loginPage.login("student@example.com", "secret123");
    await dashboardPage.waitForTitleContains("Dashboard");
    console.log(await dashboardPage.readTitle());
  } finally {
    await driver.quit();
  }
}

run().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
