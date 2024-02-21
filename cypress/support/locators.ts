export const login = {
    btn_login: () => cy.get("#login-button"),
    inp_username: () => cy.get("[data-test='username']"),
    inp_password: () => cy.get("[data-test='password']"),
    img_logo: () => cy.get(".login_logo"),
}