import { mainUrl } from "../../utils/strings"

export {}
declare global {
  namespace Cypress {
    interface Chainable<Subject = any> {
      launchStore(): Chainable<void>
      checkCheckbox(selector: any): Chainable<void>
      assertUrl(value: string): Chainable<void>
      clickWhileTrue(select: any): Chainable<void>
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

Cypress.Commands.add('clickWhileTrue', (selector) => {
  selector.its('length')
  .then(count => {
    const countOfElements = count
    cy.log('There are -> ' + countOfElements + " <- Elements") 
    for (let i =1; i<= countOfElements; i++){
      cy.get(selector).eq(0).click()
    }
  })
})