describe("custom cypress commands", () => {
  it("uses a custom login command before assertions", () => {
    cy.visit("/");
    cy.loginAsStudyUser("Cristiano");
    cy.reload();
    cy.get("[data-cy=welcome-message]").should("contain", "Welcome Cristiano");
  });
});
