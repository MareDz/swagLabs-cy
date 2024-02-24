import { checkoutFinishCaption, checkoutFinishTyCaption, checkoutFinishUrl, checkoutMissingFirstNameCaption, checkoutMissingLastNameCaption, checkoutMissingZipCaption, checkoutStep1Caption, checkoutStep1Url, checkoutStep2Caption, checkoutStep2Url, shoppingCartCaption, shoppingCartUrl } from "../../utils/strings"
import { base, checkout } from "../locators"

export {}
declare global {
  namespace Cypress {
    interface Chainable<Subject = any> {
      proceedToCheckout(): Chainable<void>
      fillCheckoutData(): Chainable<void>
      continueWithCheckout(): Chainable<void>
      finishCheckout(): Chainable<void>
      errorFillDataCheckout(): Chainable<void>
    }
  }
}

Cypress.Commands.add('proceedToCheckout', () => {
  checkout.btn_checkout().click()
  cy.assertUrl(checkoutStep1Url)
  base.lbl_subheader().should('have.text', checkoutStep1Caption)
})

Cypress.Commands.add('continueWithCheckout', () => {
  checkout.btn_continue().click()
  cy.assertUrl(checkoutStep2Url)
  base.lbl_subheader().should('have.text', checkoutStep2Caption)
})

Cypress.Commands.add('finishCheckout', () => {
  checkout.btn_finish().click()
  cy.assertUrl(checkoutFinishUrl)
  base.lbl_subheader().should('have.text', checkoutFinishCaption)
  checkout.lbl_thankYou().should('have.text', checkoutFinishTyCaption)
  checkout.img_ponyExpress()
})

Cypress.Commands.add('fillCheckoutData', () => {
  cy.fixture('checkout.json').then((data) => {
    checkout.inp_firstName().type(data.firstName)
    checkout.inp_lastName().type(data.lastName)
    checkout.inp_zipCode().type(data.zipCode)
  })
})

/*
- Perform all combinations to trigger error message
- Cancel the checkout
*/
Cypress.Commands.add('errorFillDataCheckout', () => {
  cy.fixture('checkout.json').then((data) => {
    // Without zip code
    checkout.inp_firstName().type(data.firstName)
    checkout.inp_lastName().type(data.lastName)
    checkout.btn_continue().click()
    checkout.lbl_checkoutError().should('contain.text', checkoutMissingZipCaption)

    // Without first name
    checkout.inp_firstName().clear()
    checkout.inp_lastName().clear()
    checkout.inp_zipCode().clear()
    checkout.inp_lastName().type(data.lastName)
    checkout.inp_zipCode().type(data.zipCode)
    checkout.btn_continue().click()
    checkout.lbl_checkoutError().should('contain.text', checkoutMissingFirstNameCaption)

    // Without last name
    checkout.inp_firstName().clear()
    checkout.inp_lastName().clear()
    checkout.inp_zipCode().clear()
    checkout.inp_firstName().type(data.firstName)
    checkout.inp_zipCode().type(data.zipCode)
    checkout.btn_continue().click()
    checkout.lbl_checkoutError().should('contain.text', checkoutMissingLastNameCaption)
  })
  .then(() =>{
    checkout.btn_cancel().click()
    cy.assertUrl(shoppingCartUrl)
    base.lbl_subheader().should('have.text', shoppingCartCaption)
  })
})

