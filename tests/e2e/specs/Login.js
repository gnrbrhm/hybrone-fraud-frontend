// https://docs.cypress.io/api/introduction/api.html

// describe("My First Test", () => {
//   it("Visits the app root url", () => {
//     cy.visit("/");
//     cy.contains("h1", "Welcome to Your Vue.js App");
//   });
// });
describe("Login Test", () => {
  it("Visits login url ", () => {
    cy.visit("/");
    cy.get("#email").type("akbank2@biges365.local");
    cy.get("#password").type("akbank2@biges365.local");
    cy.contains(" OTURUM AÇ").click();
    cy.request({
      url: "http://34.140.224.22:3000/api/v1/user/login",
      method: "POST",
      body: {
        username: "akbank2@biges365.local",
        password: "Password2",
      },
    });
    (response) => {
      // response.body is automatically serialized into JSON
      expect(response.body.data.user).to.have.property(
        "username",
        "akbank2@biges365.local"
      ); // true
    };
  });
});
