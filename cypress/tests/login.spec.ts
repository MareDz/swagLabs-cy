describe('Login Test Cases', () => {
    it("Login to store", () => {
        cy.launchStore()
        cy.loginToStore()
    })
})