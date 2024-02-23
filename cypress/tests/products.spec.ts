import { product1 } from "../utils/strings"

describe('Product Details Tests', () => {

    beforeEach(() => {
        cy.launchStore()
        cy.loginToStore()
    })

    afterEach(() => {
        cy.logOut()
    })

    it('Verify product details for each product', () => {
        cy.openAndAssertProductDetails(product1)
    })

    it('Verify product details for each product', () => {
        cy.assertAllProducts()
    })
})

describe('Sorting Tests', () => {
    // ADD TESTS FOR SORTING IN INVENTORY PAGE
})