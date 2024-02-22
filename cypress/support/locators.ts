export const base = {
    btn_sideMenu: () => cy.get(".bm-burger-button"),
}

export const login = {
    btn_login: () => cy.get("#login-button"),
    btn_logOut: () => cy.get("#logout_sidebar_link"),
    btn_closeError: () => cy.get(".error-button"),
    inp_username: () => cy.get("[data-test='username']"),
    inp_password: () => cy.get("[data-test='password']"),
    lbl_error: () => cy.get("[data-test='error']"),
    img_logo: () => cy.get(".login_logo"),
}