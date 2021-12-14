// import endpoints from "@/src/endpoints";

describe("Dashboard Test", () => {
  it("Get dashboard data completely ", () => {
    cy.request({
      //   ...endpoints.getDashboardData,
      url: "http://192.168.3.199:3000/api/v1/prosec/devices",
      method: "GET",
    });
    (response) => {
      // response.body is automatically serialized into JSON
      expect(response.body.data.user); // true
    };
  });
});
