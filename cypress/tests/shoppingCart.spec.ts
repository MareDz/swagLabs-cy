import { product1 } from "../utils/strings"

describe('Shopping Cart Tests', () => {

    beforeEach(() => {
        cy.launchStore()
        cy.loginToStore()
    })

    // afterEach(() => {
    //     cy.logOut()
    // })

    it('Add and remove item from a cart V1', () => {
        cy.openAndAssertProductDetails(product1)
        cy.addAndAssertProductInCart()
        cy.removeItemsFromCart()
    })


})

describe('Ordering Tests', () => {
    // ADD TESTS FOR ORDERING
})