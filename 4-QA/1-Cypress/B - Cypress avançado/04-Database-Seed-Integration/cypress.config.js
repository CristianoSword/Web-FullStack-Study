const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "http://127.0.0.1:4204",
    specPattern: "cypress/e2e/**/*.cy.js",
    supportFile: "cypress/support/e2e.js",
    setupNodeEvents(on) {
      const seededUsers = [];
      on("task", {
        seedDatabase(user) {
          seededUsers.push(user);
          return seededUsers.length;
        },
        readSeededUsers() {
          return seededUsers;
        }
      });
    }
  }
});
