import { product1, product2 } from "../utils/strings"

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

    before(() => {
        cy.getCheckoutData()
    })

    beforeEach(() => {
        cy.launchStore()
        cy.loginToStore()
    })

    afterEach(() => {
        cy.logOut()
    })

    after(() => {
        cy.clearJsonValues('checkout')
    })

    it('Checkout positive', () => {
        cy.inventoryAddItemToCart(product1)
        cy.inventoryAddItemToCart(product2)
        cy.openShoppingCart()
        cy.proceedToCheckout()
        cy.fillCheckoutData()
        cy.continueWithCheckout()
        cy.finishCheckout()
    })

    it('Checkout negative', () => {
        cy.inventoryAddItemToCart(product1)
        cy.inventoryAddItemToCart(product2)
        cy.openShoppingCart()
        cy.proceedToCheckout()
        cy.errorFillDataCheckout()
    })
})