describe("element selectors and assertions", () => {
  it("finds buttons and inputs and asserts visibility", () => {
    cy.visit("/");
    cy.get("[data-cy=search-input]").should("be.visible").and("have.attr", "type", "text");
    cy.get("[data-cy=primary-action]").should("contain", "Run search").and("be.enabled");
    cy.get("[data-cy=secondary-action]").should("be.disabled");
  });
});
