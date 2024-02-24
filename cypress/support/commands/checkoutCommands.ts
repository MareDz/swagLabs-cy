import { checkoutCaption, checkoutUrl } from "../../utils/strings"
import { base, checkout } from "../locators"

export {}
declare global {
  namespace Cypress {
    interface Chainable<Subject = any> {
      proceedToCheckout(): Chainable<void>
    }
  }
}

Cypress.Commands.add('proceedToCheckout', () => {
  checkout.btn_checkout().click()
  cy.assertUrl(checkoutUrl)
  base.lbl_subheader().should('have.text', checkoutCaption)
})

