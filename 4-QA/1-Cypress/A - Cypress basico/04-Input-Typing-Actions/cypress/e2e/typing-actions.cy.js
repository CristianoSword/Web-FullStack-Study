describe("input typing and actions", () => {
  it("fills the form and submits it", () => {
    cy.visit("/");
    cy.get("[data-cy=name-input]").type("Cristiano");
    cy.get("[data-cy=email-input]").type("cristiano@example.com");
    cy.get("[data-cy=submit-button]").click();
    cy.get("[data-cy=result]").should("contain", "Saved Cristiano <cristiano@example.com>");
  });
});
