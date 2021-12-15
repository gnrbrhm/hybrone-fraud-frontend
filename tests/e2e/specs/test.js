// https://docs.cypress.io/api/introduction/api.html

describe('My First Test', () => {
  it('Visits the app root url', () => {
    cy.visit('/')
    cy.contains('button', 'OTURUM AÇ')
  })
})
describe('Login Test', () => {
  it('Visits login url ', () => {
    cy.request({
      url: 'http://192.168.3.199:3000/api/v1/user/login',
      method: 'POST',
      body: {
        username: 'akbank2@biges365.local',
        password: 'Password2'
      }
    })
    ;(response) => {
      // response.body is automatically serialized into JSON
      expect(response.body.data.user).to.have.property(
        'username',
        'akbank2@biges365.local'
      ) // true
    }
  })
})
