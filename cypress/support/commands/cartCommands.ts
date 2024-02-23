import { shoppingCartUrl } from "../../utils/strings"
import { base, cart, inventory, product } from "../locators"

export {}
declare global {
  namespace Cypress {
    interface Chainable<Subject = any> {
      addAndAssertProductInCart(): Chainable<void>
      removeItemsFromCart(): Chainable<void>
      addAllItemsToCart(): Chainable<void>
      openShoppingCart(): Chainable<void>
      productDetailsCartInteraction(): Chainable<void>
    }
  }
}

/*
- Add an item to a cart
- Verify item conten/values in Details and Cart page  [name, description, price]
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
         cy.openShoppingCart()
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
  cart.btn_removeFromCart()
    .its('length')
    .then((count) => {
      const elements = count
      for(let i=0; i<elements; i++){
        cart.btn_removeFromCart().first().click()
      }
    })
  cart.lbl_cartItem().should('not.exist')
  base.lbl_shoppingCartNumber().should('not.exist')
})

/*
- Loop through all items and add them to the cart
- Verify that aggregated number of items in cart is same as added items
*/
Cypress.Commands.add('addAllItemsToCart', () => {
  inventory.btn_addToCart()
    .its('length')
    .then((count) => {
      const elements = count
      for (let i=0; i<elements; i++){
        inventory.btn_addToCart().first().click()
      }
      base.lbl_shoppingCartNumber().should('have.text', count)
    })
})

/*
- Open shopping cart and assert url
*/
Cypress.Commands.add('openShoppingCart', () => {
  base.btn_shoppingCart().click()
  cy.assertUrl(shoppingCartUrl)
})

/*
- From product details page add and remove item from cart
- Verify content of dynamic buttons
- Verify that aggregate number is changing appropriately
*/
Cypress.Commands.add('productDetailsCartInteraction', () => {
  product.btn_addToCart().should('have.text', 'ADD TO CART').click()
  base.lbl_shoppingCartNumber().should('have.text', 1)
  product.btn_removeFromCart().should('have.text', 'REMOVE')
  product.btn_removeFromCart().click()
  base.lbl_shoppingCartNumber().should('not.exist')
})