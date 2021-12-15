// import endpoints from "@/src/endpoints";

describe('Dashboard Test', () => {
  it('Get dashboard data completely ', () => {
    cy.request({
      url: 'http://34.140.224.22:3000/api/v1/user/login',
      method: 'POST',
      body: {
        username: 'akbank2@biges365.local',
        password: 'Password2'
      }
    })
    ;(response) => {
      // response.body is automatically serialized into JSON
      describe('GEt Database', () => {
        it('Get Dashboard', () => {
          const token = JSON.parse(response.body.data.token)
          console.log(token)
          expect(response.body.data.user).to.have.property(
            'username',
            'akbank2@biges365.local'
          ) // true
          cy.request({
            //   ...endpoints.getDashboardData,
            url: 'http://34.140.224.22:3000/api/v1/prosec/devices',
            method: 'GET',
            auth: {
              bearer: token
            }
          })
          ;(response) => {
            // response.body is automatically serialized into JSON
            expect(response.body.data) // true
          }
        })
      })
    }
  })
})
