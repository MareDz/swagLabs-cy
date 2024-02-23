import { lbl_lockerUser, lbl_wrongCredentials } from "../utils/strings"

describe('Login Test Cases', () => {

    beforeEach(() => {
        cy.launchStore()
    })

    it("Login to store - Standard User", () => {
        cy.loginToStore()
        cy.logOut()
    })

    it("Login to store - Invalid Credentials", () => {
        cy.fixture("user.json").then((data) => {
            cy.loginToStoreParams(data.standardUser, "123qwe!@")
            cy.errorWrongCredentials(lbl_wrongCredentials)
        })
    })

    it("Login to store - Locked Out User", () => {
        cy.fixture("user.json").then((data) => {
            cy.loginToStoreParams(data.lockedUser, data.password)
            cy.errorWrongCredentials(lbl_lockerUser)
        })
    })

    it("Login to store - Problem Out User", () => {
        cy.fixture("user.json").then((data) => {
            cy.loginToStoreParams(data.problemUser, data.password)
            cy.logOut()
        })
    })

    it("Login to store - Performance Glitch User", () => {
        cy.fixture("user.json").then((data) => {
            cy.loginToStoreParams(data.glitchUser, data.password)
            cy.logOut()
        })
    })
})