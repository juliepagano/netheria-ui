export {};

describe("Benchmark only", () => {
  it("load the page", () => {
    cy.visit("/");
  });

  it("cannot octomize without hardware targets", () => {
    cy.get("button")
      .contains("octomize", {
        matchCase: false,
      })
      .should("be.disabled");

    cy.get("[data-test-id='totalRuns']").should("have.text", "0");
  });

  it("select some hardware targets", () => {
    for (let i = 1; i <= 3; i++) {
      if (i > 1) {
        cy.get("button")
          .contains("add", {
            matchCase: false,
          })
          .click();
      }
      cy.get("select[name='provider']")
        .last()
        .select((i % 2) + 1);
      cy.get("select[name='instance']").last().select(i);
    }
  });

  it("cannot octomize without actions", () => {
    cy.get("button")
      .contains("octomize", {
        matchCase: false,
      })
      .should("be.disabled");

    cy.get("[data-test-id='totalRuns']").should("have.text", "0");
  });

  it("selects both actions", () => {
    cy.get('input[name="accelerate"]').check();
    cy.get('input[name="benchmark"]').check();
  });

  it("can octomize with the correct number of runs", () => {
    cy.get("button")
      .contains("octomize", {
        matchCase: false,
      })
      .should("not.be.disabled");

    cy.get("[data-test-id='totalRuns']").should("have.text", "6");
  });
});
