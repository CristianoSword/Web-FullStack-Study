const { By } = require("selenium-webdriver");
const { BasePage } = require("./base-page.js");

class LoginPage extends BasePage {
  async fillEmail(value) {
    await this.driver.findElement(By.id("email")).sendKeys(value);
  }

  async fillPassword(value) {
    await this.driver.findElement(By.id("password")).sendKeys(value);
  }

  async submit() {
    await this.driver.findElement(By.id("submit-button")).click();
  }

  async login(email, password) {
    await this.fillEmail(email);
    await this.fillPassword(password);
    await this.submit();
  }
}

module.exports = {
  LoginPage
};
