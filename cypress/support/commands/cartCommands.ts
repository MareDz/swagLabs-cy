import { shoppingCartCaption, shoppingCartUrl } from "../../utils/strings"
import { base, cart, inventory, product } from "../locators"

export {}
declare global {
  namespace Cypress {
    interface Chainable<Subject = any> {
      productDetailsAddToCart(): Chainable<void>
      removeItemsFromCart(): Chainable<void>
      inventoryAddAllItemsToCart(): Chainable<void>
      inventoryAddItemToCart(item: string): Chainable<void>
      openShoppingCart(): Chainable<void>
      productDetailsCartInteraction(): Chainable<void>
    }
  }
}

/*
- Add an item to a cart
- Verify that item conten/values are same in Details and Cart page [name, description, price]
*/
Cypress.Commands.add('productDetailsAddToCart', () => {
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

/*
- From inventory page loop through all items and add them to the cart 
- Verify that aggregated number of items in cart is accurate
*/
Cypress.Commands.add('inventoryAddAllItemsToCart', () => {
  inventory.btn_addToCart()
    .its('length')
    .then((count) => {
      const elements = count
      // for this component, we're not using cy.each(), on prupose for demo to have all approaches
      for (let i=0; i<elements; i++){
        inventory.btn_addToCart().first().click()
      }
      base.lbl_shoppingCartNumber().should('have.text', elements)
    })
})

/*
- Remove all items from a cart
- Verify that no items are in cart
- Verify that aggregat number of items in cart is not displayed when cart is empty
*/
Cypress.Commands.add('removeItemsFromCart', () => {
  cart.btn_removeFromCart()
    .each(() => {
      cart.btn_removeFromCart().first().click()
    })
  cart.lbl_cartItem().should('not.exist')
  base.lbl_shoppingCartNumber().should('not.exist')
})

/*
- From inventory page add specific item to cart
*/
Cypress.Commands.add('inventoryAddItemToCart', (item) => {
  inventory.btn_addToCartByName(item).click()
  inventory.btn_addToCartByName(item).should('have.text', 'REMOVE')
})

/*
- Open shopping cart and assert url
*/
Cypress.Commands.add('openShoppingCart', () => {
  base.btn_shoppingCart().click()
  cy.assertUrl(shoppingCartUrl)
  base.lbl_subheader().should('have.text', shoppingCartCaption)
})

