describe('Inventory - Shopping Cart Test Cases', () => {

    beforeEach(() => {
        cy.launchStore()
        cy.loginToStore()
    })

    // afterEach(() => {
    //     cy.logOut()
    // })

    it('Verify product details', () => {
     //   cy.openAndAssertProductDetails('Sauce Labs Backpack')
        cy.assertAllProducts()
    })

})