describe("simple navigation", () => {
  it("navigates to the catalog page and validates the title", () => {
    cy.visit("/");
    cy.title().should("eq", "Study Home");
    cy.get("[data-cy=catalog-link]").click();
    cy.url().should("include", "/catalog.html");
    cy.title().should("eq", "Study Catalog");
    cy.get("[data-cy=catalog-title]").should("be.visible");
  });
});
