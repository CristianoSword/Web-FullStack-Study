describe("redirect verification", () => {
  it("validates the URL after clicking the link", () => {
    cy.visit("/");
    cy.get("[data-cy=start-link]").click();
    cy.url().should("include", "/success.html");
    cy.get("[data-cy=success-title]").should("contain", "Redirect successful");
  });
});
