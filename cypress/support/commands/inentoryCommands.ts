import { inventory, product } from "../locators"

export {}
declare global {
  namespace Cypress {
    interface Chainable<Subject = any> {
        openProductByName(item: string): Chainable<void>
    }
  }
}

Cypress.Commands.add('openProductByName', (item) => {
    // inventory.btn_itemByName(item).click()
    inventory.lbl_priceByPrice(item)
    // product.lbl_productName().should('contain.text', item)
})
