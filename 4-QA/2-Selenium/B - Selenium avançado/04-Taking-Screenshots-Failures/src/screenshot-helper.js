const fs = require("node:fs/promises");
const path = require("node:path");

async function captureScreenshot(driver, fileName) {
  const outputDir = path.join(__dirname, "..", "artifacts");
  await fs.mkdir(outputDir, { recursive: true });
  const image = await driver.takeScreenshot();
  await fs.writeFile(path.join(outputDir, fileName), image, "base64");
}

module.exports = {
  captureScreenshot
};
