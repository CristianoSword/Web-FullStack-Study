const { until } = require("selenium-webdriver");

class BasePage {
  constructor(driver) {
    this.driver = driver;
  }

  async open(fileUrl) {
    await this.driver.get(fileUrl);
  }

  async waitForTitleContains(value) {
    await this.driver.wait(until.titleContains(value), 3000);
  }
}

module.exports = {
  BasePage
};
