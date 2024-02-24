import { mainUrl } from "../../utils/strings"

export {}
declare global {
  namespace Cypress {
    interface Chainable<Subject = any> {
      launchStore(): Chainable<void>
      checkCheckbox(selector: any): Chainable<void>
      assertUrl(value: string): Chainable<void>
      updateJsonValues(filePath: string, updates: Record<string, any>): Chainable<void>
      clearJsonValues(filePath: string): Chainable<void>
      getCheckoutData(): Chainable<void>
    }
  }
}

Cypress.Commands.add('launchStore', () => {
    cy.visit("/index.html")
    cy.assertUrl(mainUrl)
})

Cypress.Commands.add('checkCheckbox', selector => {
  selector
  .check({ force: true })
  .should('be.checked')
})

Cypress.Commands.add('assertUrl', value => {
  cy.url()
  .should('include', value)
})

/*
- Update specific value/s for desired json
*/
Cypress.Commands.add('updateJsonValues', (filePath, updates) => {
  cy.readFile(filePath).then(content => {
    Object.assign(content, updates)
    cy.writeFile(filePath, content)
  })
})

/*
- Clear all values of desired json
*/
Cypress.Commands.add('clearJsonValues', fixtureName => {
  cy.fixture(fixtureName).then(data => {
    Object.keys(data).forEach(key => (data[key] = null))
    cy.writeFile(`cypress/fixtures/${fixtureName}.json`, data)
  })
})

  // Log the entire response body as a string
  // cy.log('RESPONSE BODY: ', JSON.stringify(responseBody));

Cypress.Commands.add('getCheckoutData', () => {
  cy.request({
      method: 'GET',
      url: 'https://randomuser.me/api/?password=7-13',
  })
  .then((response) => {
    const responseBody = response.body.results[0]
    expect(response.status).to.equal(200)

    cy.log("Created first name: " + responseBody.name.first)
    cy.log("Created laset name: " + responseBody.name.last)
    cy.log("Create zip code: " + responseBody.location.postcode)

    cy.updateJsonValues('cypress/fixtures/checkout.json', {
      firstName: responseBody.name.first,
      lastName: responseBody.name.last,
      zipCode: responseBody.location.postcode
    })
  })
})
