import { inventory } from "../support/locators"

describe('Inventory - Shopping Cart Test Cases', () => {

    beforeEach(() => {
        cy.launchStore()
        cy.loginToStore()
    })

    // afterEach(() => {
    //     cy.logOut()
    // })

    it('Add item to cart', () => {
        cy.openProductByName('Sauce Labs Backpack')
    })

})