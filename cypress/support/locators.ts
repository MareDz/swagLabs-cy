export const base = {
    btn_sideMenu: () => cy.get(".bm-burger-button"),
    btn_shoppingCart: () => cy.get(".fa-layers-counter"),
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
    btn_addToCart_Parent: () => cy.get(".btn_primary.btn_inventory"),
    btn_itemByName: (name: string) =>  cy.get('.inventory_item').find('.inventory_item_label').contains(`${name}`),
    lbl_priceByName: (name: string) => cy.get('.inventory_item').children('.inventory_item_label').contains(`${name}`).parents('.inventory_item').find('.pricebar').children('.inventory_item_price'),
    lbl_descriptionByName: (name: string) => cy.get('.inventory_item').children('.inventory_item_label').contains(`${name}`).next('.inventory_item_desc'),
    lbl_price_Parent: () => cy.get(".inventory_item_price"),
    lbl_itemName_Parent: () => cy.get(".inventory_item_name"),
}

export const product = {
    btn_back: () => cy.get(".inventory_details_back_button"),
    btn_addToCart: () => cy.get(".btn_primary").contains("ADD TO CART"),
    btn_removeFromCart: () => cy.get(".btn_primary").contains("REMOVE"),
    lbl_productName: () => cy.get(".inventory_details_name"),
    lbl_productPrice: () => cy.get(".inventory_details_price"),
    lbl_productDesription: () => cy.get(".inventory_details_desc"),
}