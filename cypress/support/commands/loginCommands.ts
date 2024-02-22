import { inventoryUrl, swagTitle } from "../../utils/strings"
import { login } from "../locators"

export {}
declare global {
  namespace Cypress {
    interface Chainable<Subject = any> {
        loginToStore(): Chainable<void>
        loginToStoreParams(username: string, password: string): Chainable<void>
    }
  }
}

Cypress.Commands.add('loginToStore', () => {
    cy.fixture('user.json').then((data) => {
        login.inp_username().type(data.standardUser)
        login.inp_password().type(data.password)
        login.btn_login().click()
        cy.assertUrl(inventoryUrl)
        cy.title().should('eq', swagTitle)
    })
})

Cypress.Commands.add('loginToStoreParams', (username, password) => {
    login.inp_username().type(username)
    login.inp_password().type(password)
    login.btn_login().click()
})