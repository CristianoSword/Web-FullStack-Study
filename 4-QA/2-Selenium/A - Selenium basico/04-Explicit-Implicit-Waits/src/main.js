const path = require("node:path");
const { Builder, By, until } = require("selenium-webdriver");

async function run() {
  const driver = await new Builder().forBrowser("chrome").build();

  try {
    await driver.manage().setTimeouts({ implicit: 2000 });
    const pageUrl = `file:///${path.join(__dirname, "..", "app", "index.html").replace(/\\/g, "/")}`;
    await driver.get(pageUrl);
    await driver.findElement(By.id("load-button")).click();
    await driver.wait(until.elementTextContains(driver.findElement(By.id("result")), "Async message"), 4000);
    const result = await driver.findElement(By.id("result")).getText();
    console.log(result);
  } finally {
    await driver.quit();
  }
}

run().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
