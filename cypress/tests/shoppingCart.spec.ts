import { product1 } from "../utils/strings"

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
        cy.addAndAssertProductInCart()
        cy.removeItemsFromCart()
    })

    it('Add and remove all items from a cart', () => {
        cy.addAllItemsToCart()
        cy.openShoppingCart()
        cy.removeItemsFromCart()
    })

    it('Add and remove item from product details page', () => {
        cy.openAndAssertProductDetails(product1)
        cy.productDetailsCartInteraction()
    })
})

describe('Ordering Tests', () => {
    // ADD TESTS FOR ORDERING
})