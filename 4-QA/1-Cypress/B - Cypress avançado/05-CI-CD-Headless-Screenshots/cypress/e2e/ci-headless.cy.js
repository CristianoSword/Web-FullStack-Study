describe("ci cd headless screenshots", () => {
  it("runs in headless mode and validates the smoke page", () => {
    cy.visit("/");
    cy.get("[data-cy=ci-title]").should("contain", "CI Headless Run");
    cy.get("[data-cy=ci-description]").should("be.visible");
    cy.screenshot("ci-headless-smoke");
  });
});
