describe("intercepting api requests", () => {
  it("stubs the lessons endpoint and validates the response", () => {
    cy.intercept("GET", "/api/lessons", {
      statusCode: 200,
      body: {
        items: [
          { id: "l-1", title: "Intercept basics" },
          { id: "l-2", title: "Stub advanced payloads" }
        ]
      }
    }).as("getLessons");

    cy.visit("/");
    cy.get("[data-cy=load-button]").click();
    cy.wait("@getLessons").its("response.body.items").should("have.length", 2);
    cy.get("[data-cy=lessons]").should("contain", "Intercept basics");
    cy.get("[data-cy=lessons]").should("contain", "Stub advanced payloads");
  });
});
