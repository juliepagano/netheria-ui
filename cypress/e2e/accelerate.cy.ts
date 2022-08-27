export {};

describe("Benchmark only", () => {
  it("load the page", () => {
    cy.visit("/");
  });

  it("select accelerate", () => {
    cy.get('input[name="accelerate"]').check();
  });

  it("cannot octomize without hardware targets", () => {
    cy.get("button")
      .contains("octomize", {
        matchCase: false,
      })
      .should("be.disabled");

    cy.get("[data-test-id='totalRuns']").should("have.text", "0");
  });

  it("select a provider", () => {
    cy.get("select[name='provider']").select(1);
  });

  it("select an instance", () => {
    cy.get("select[name='instance']").select(1);
  });

  it("can octomize with the correct number of runs", () => {
    cy.get("button")
      .contains("octomize", {
        matchCase: false,
      })
      .should("not.be.disabled");

    cy.get("[data-test-id='totalRuns']").should("have.text", "1");
  });

  it("can add another hardware target", () => {
    cy.get("button")
      .contains("add", {
        matchCase: false,
      })
      .click();
    cy.get("select[name='provider']").last().select(2);
    cy.get("select[name='instance']").last().select(3);
  });

  it("can octomize with the correct number of runs", () => {
    cy.get("button")
      .contains("octomize", {
        matchCase: false,
      })
      .should("not.be.disabled");

    cy.get("[data-test-id='totalRuns']").should("have.text", "2");
  });
});
