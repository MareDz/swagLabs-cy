import { shoppingCartUrl } from "../../utils/strings"
import { base, cart, inventory, product } from "../locators"

export {}
declare global {
  namespace Cypress {
    interface Chainable<Subject = any> {
      addAndAssertProductInCart(): Chainable<void>
      removeItemsFromCart(): Chainable<void>

    }
  }
}

/*
- Add an item to a cart
- Verify item conten/values in Details and Cart page 
*/
Cypress.Commands.add('addAndAssertProductInCart', () => {
  product.lbl_productName().invoke('text').as('getName')
  product.lbl_productDesription().invoke('text').as('getDescription')
  product.lbl_productPrice()
        .invoke('text')
        .then(text => {
          const price = Number(text.replace(/\$/g, ''))
          cy.wrap(price).as('getPrice')
        })

  cy.get('@getName').then((name) => {
    cy.get('@getDescription').then((description) => {
      cy.get('@getPrice').then((price) => {
        product.btn_addToCart().click()
        base.btn_shoppingCart().click()
        cy.assertUrl(shoppingCartUrl)
        cart.lbl_productName().should('have.text', name)
        cart.lbl_productDescription().should('have.text', description)
        cart.lbl_productPrice().should('have.text', price)
      })
    })  
  })
})

/*
- Remove all items from a cart
- Verify that no items are in cart
- Verify that aggregat number of items in cart is not displayed in cart icon
*/
Cypress.Commands.add('removeItemsFromCart', () => {
  cart.btn_removeFromCart().click({multiple: true})
  cart.lbl_cartItem().should('not.exist')
  base.lbl_shoppingCart().should('not.exist')
})