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

export const inventory = {
    btn_addToCartParent: () => cy.get(".btn_primary.btn_inventory"),
    btn_itemByName: (name: string) =>  cy.get('.inventory_item').find('.inventory_item_label').contains(`${name}`),
    lbl_priceByPrice: (name: string) => cy.get('.inventory_item').children('.inventory_item_label').contains(`${name}`).parents('.inventory_item').find('.pricebar'),
    lbl_priceParent: () => cy.get(".inventory_item_price"),
}

export const product = {
    lbl_productName: () => cy.get(".inventory_details_name")
}