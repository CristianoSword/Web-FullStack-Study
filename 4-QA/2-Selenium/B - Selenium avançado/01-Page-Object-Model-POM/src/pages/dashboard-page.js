const { By } = require("selenium-webdriver");
const { BasePage } = require("./base-page.js");

class DashboardPage extends BasePage {
  async readTitle() {
    return this.driver.findElement(By.id("dashboard-title")).getText();
  }
}

module.exports = {
  DashboardPage
};
