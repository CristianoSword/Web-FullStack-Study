Cypress.Commands.add("loginAsStudyUser", (name = "Cristiano") => {
  cy.window().then((window) => {
    window.localStorage.setItem("study-session", JSON.stringify({ name }));
  });
});
