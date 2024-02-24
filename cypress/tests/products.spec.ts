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

    it('Inventory price sorting', () => {
        cy.inventoryPriceSorting('Price (low to high)')
        cy.inventoryPriceSorting('Price (high to low)')
    })
})