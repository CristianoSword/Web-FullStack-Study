const path = require("node:path");
const { Builder, By } = require("selenium-webdriver");

async function run() {
  const driver = await new Builder().forBrowser("chrome").build();

  try {
    const pageUrl = `file:///${path.join(__dirname, "..", "app", "index.html").replace(/\\/g, "/")}`;
    await driver.get(pageUrl);

    const heading = await driver.findElement(By.css(".card h1")).getText();
    const button = await driver.findElement(By.css(".primary-action")).getText();
    const secondItem = await driver.findElement(By.xpath("//ul/li[2]")).getText();

    console.log({ heading, button, secondItem });
  } finally {
    await driver.quit();
  }
}

run().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
