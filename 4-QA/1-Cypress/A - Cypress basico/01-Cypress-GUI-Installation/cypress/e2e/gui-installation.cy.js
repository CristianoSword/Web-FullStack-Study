describe("Cypress GUI installation", () => {
  it("opens the local study page", () => {
    cy.visit("/");
    cy.get("[data-cy=headline]").should("contain", "Cypress GUI Installation");
    cy.get("[data-cy=description]").should("be.visible");
  });
});
