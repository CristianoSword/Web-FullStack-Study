describe("complete authentication flow", () => {
  it("registers, logs in and redirects to the dashboard", () => {
    cy.visit("/");
    cy.get("[data-cy=register-link]").click();
    cy.get("[data-cy=register-name]").type("Cristiano");
    cy.get("[data-cy=register-email]").type("cristiano@example.com");
    cy.get("[data-cy=register-password]").type("secret123");
    cy.get("[data-cy=register-submit]").click();

    cy.url().should("include", "/login.html");
    cy.get("[data-cy=login-email]").type("cristiano@example.com");
    cy.get("[data-cy=login-password]").type("secret123");
    cy.get("[data-cy=login-submit]").click();

    cy.url().should("include", "/dashboard.html");
    cy.get("[data-cy=dashboard-title]").should("contain", "Welcome to the dashboard");
  });
});
