const path = require("node:path");
const { Builder, By } = require("selenium-webdriver");
const { captureScreenshot } = require("./screenshot-helper.js");

async function run() {
  const driver = await new Builder().forBrowser("chrome").build();

  try {
    const pageUrl = `file:///${path.join(__dirname, "..", "app", "index.html").replace(/\\/g, "/")}`;
    await driver.get(pageUrl);

    const text = await driver.findElement(By.id("screen-title")).getText();
    if (text !== "Unexpected title") {
      throw new Error(`Assertion failed. Received '${text}'`);
    }
  } catch (error) {
    await captureScreenshot(driver, "failure.png");
    throw error;
  } finally {
    await driver.quit();
  }
}

run().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
