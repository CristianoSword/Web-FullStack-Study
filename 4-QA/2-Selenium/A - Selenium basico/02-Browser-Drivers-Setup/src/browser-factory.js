const { Builder } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
const firefox = require("selenium-webdriver/firefox");
const edge = require("selenium-webdriver/edge");

function createDriver(browserName) {
  const normalized = (browserName || "chrome").toLowerCase();
  const builder = new Builder().forBrowser(normalized);

  if (normalized === "chrome" && process.env.CHROME_DRIVER_PATH) {
    builder.setChromeService(new chrome.ServiceBuilder(process.env.CHROME_DRIVER_PATH));
  }

  if (normalized === "firefox" && process.env.FIREFOX_DRIVER_PATH) {
    builder.setFirefoxService(new firefox.ServiceBuilder(process.env.FIREFOX_DRIVER_PATH));
  }

  if (normalized === "edge" && process.env.EDGE_DRIVER_PATH) {
    builder.setEdgeService(new edge.ServiceBuilder(process.env.EDGE_DRIVER_PATH));
  }

  return builder.build();
}

module.exports = {
  createDriver
};
