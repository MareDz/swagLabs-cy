describe('Inventory - Shopping Cart Test Cases', () => {

    beforeEach(() => {
        cy.launchStore()
        cy.loginToStore()
    })

    // afterEach(() => {
    //     cy.logOut()
    // })

    it('Add item to cart', () => {
        cy.get(".btn_primary.btn_inventory")
            .parents('.inventory_item')
            .find('.inventory_item_label')
            .contains("Sauce Labs Bolt T-Shirt")
            .click()
    })

})