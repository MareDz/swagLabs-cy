import { inventoryCaption, inventoryUrl, lbl_wrongCredentials, mainUrl, swagTitle } from "../../utils/strings"
import { base, inventory, login } from "../locators"

export {}
declare global {
  namespace Cypress {
    interface Chainable<Subject = any> {
        loginToStore(): Chainable<void>
        loginToStoreParams(username: string, password: string): Chainable<void>
        logOut(): Chainable<void>
        loginError(message: string): Chainable<void>
    }
  }
}

/*
- Login to store with standard user for e2e flow
*/
Cypress.Commands.add('loginToStore', () => {
    cy.fixture('user.json').then((data) => {
        login.inp_username().clear()
        login.inp_username().type(data.standardUser)
        login.inp_password().clear()
        login.inp_password().type(data.password)
        login.btn_login().click()
        cy.assertUrl(inventoryUrl)
        inventory.lbl_productCaption().should('have.text', inventoryCaption)
        cy.title().should('eq', swagTitle)
    })
})

/*
- Login with desired user credentials
*/
Cypress.Commands.add('loginToStoreParams', (username, password) => {
    login.inp_username().clear()
    login.inp_username().type(username)
    login.inp_password().clear()
    login.inp_password().type(password)
    login.btn_login().click()
})

Cypress.Commands.add('loginError', (message) => {
  login.lbl_error().should('contain.text', message)
  // // just to test Chai library
  // login.lbl_error().invoke('text').then(text => {expect(text).to.contain(lbl_wrongCredentials)})
  login.btn_closeError().click()
  login.btn_closeError().should('not.exist')
})

Cypress.Commands.add('logOut', () => {
  base.btn_sideMenu().click()
  login.btn_logOut().click()
  cy.assertUrl(mainUrl)
})