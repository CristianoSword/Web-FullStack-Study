const { Builder, By } = require("selenium-webdriver");

async function runGridSuite(browserName, pageUrl) {
  const driver = await new Builder()
    .usingServer("http://127.0.0.1:4444/wd/hub")
    .forBrowser(browserName)
    .build();

  try {
    await driver.get(pageUrl);
    const title = await driver.findElement(By.id("grid-title")).getText();
    return { browserName, title };
  } finally {
    await driver.quit();
  }
}

module.exports = {
  runGridSuite
};
