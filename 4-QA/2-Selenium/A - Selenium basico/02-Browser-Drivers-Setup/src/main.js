const path = require("node:path");
const { createDriver } = require("./browser-factory.js");

async function run() {
  const browser = process.env.BROWSER || "chrome";
  const driver = await createDriver(browser);

  try {
    const pageUrl = `file:///${path.join(__dirname, "..", "app", "index.html").replace(/\\/g, "/")}`;
    await driver.get(pageUrl);
    const title = await driver.getTitle();
    console.log(`Opened ${browser} with page title: ${title}`);
  } finally {
    await driver.quit();
  }
}

run().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
