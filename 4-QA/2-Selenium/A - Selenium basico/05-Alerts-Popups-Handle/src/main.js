const path = require("node:path");
const { Builder, By, until } = require("selenium-webdriver");

async function run() {
  const driver = await new Builder().forBrowser("chrome").build();

  try {
    const pageUrl = `file:///${path.join(__dirname, "..", "app", "index.html").replace(/\\/g, "/")}`;
    await driver.get(pageUrl);
    await driver.findElement(By.id("alert-button")).click();
    await driver.wait(until.alertIsPresent(), 3000);
    const alert = await driver.switchTo().alert();
    const text = await alert.getText();
    await alert.accept();
    console.log(text);
  } finally {
    await driver.quit();
  }
}

run().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
