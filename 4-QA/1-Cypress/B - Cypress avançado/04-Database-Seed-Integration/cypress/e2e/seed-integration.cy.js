describe("database seed integration", () => {
  before(() => {
    cy.task("seedDatabase", {
      id: "u-1",
      email: "seeded@example.com",
      role: "student"
    });
  });

  it("uses seeded records before test execution", () => {
    cy.visit("/");
    cy.task("readSeededUsers").then((users) => {
      expect(users).to.have.length(1);
      expect(users[0].email).to.equal("seeded@example.com");
    });
    cy.get("[data-cy=seed-page-title]").should("be.visible");
  });
});
