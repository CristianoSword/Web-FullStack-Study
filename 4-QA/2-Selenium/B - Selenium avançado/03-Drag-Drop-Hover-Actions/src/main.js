const path = require("node:path");
const { Builder, By } = require("selenium-webdriver");

async function run() {
  const driver = await new Builder().forBrowser("chrome").build();

  try {
    const pageUrl = `file:///${path.join(__dirname, "..", "app", "index.html").replace(/\\/g, "/")}`;
    await driver.get(pageUrl);

    const actions = driver.actions({ async: true });
    const menuButton = await driver.findElement(By.id("menu-button"));
    const dragItem = await driver.findElement(By.id("drag-item"));
    const dropzone = await driver.findElement(By.id("dropzone"));

    await actions.move({ origin: menuButton }).perform();
    await actions.dragAndDrop(dragItem, dropzone).perform();

    const hoverText = await driver.findElement(By.id("menu-content")).getText();
    const droppedText = await driver.findElement(By.id("dropzone")).getText();
    console.log({ hoverText, droppedText });
  } finally {
    await driver.quit();
  }
}

run().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
