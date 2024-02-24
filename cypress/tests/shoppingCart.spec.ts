import { product1, product2 } from "../utils/strings"
import { inventory } from "../support/locators"

describe('Shopping Cart Tests', () => {

    beforeEach(() => {
        cy.launchStore()
        cy.loginToStore()
    })

    afterEach(() => {
        cy.logOut()
    })

    it('Add and remove item from a cart', () => {
        cy.openAndAssertProductDetails(product1)
        cy.productDetailsAddToCart()
        cy.removeItemsFromCart()
    })

    it('Add and remove all items from a cart', () => {
        cy.inventoryAddAllItemsToCart()
        cy.openShoppingCart()
        cy.removeItemsFromCart()
    })

    it('Add and remove item from product details page', () => {
        cy.openAndAssertProductDetails(product1)
        cy.productDetailsCartInteraction()
    })
})

describe('Checkout Tests', () => {

    beforeEach(() => {
        cy.launchStore()
        cy.loginToStore()
    })

    // afterEach(() => {
    //     cy.logOut()
    // })

    it.only('Checkout', () => {
        cy.inventoryAddItemToCart(product1)
        cy.inventoryAddItemToCart(product2)
        cy.openShoppingCart()
        cy.proceedToCheckout()
    })
    
})