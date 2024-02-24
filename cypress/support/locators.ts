export const base = {
    btn_sideMenu: () => cy.get(".bm-burger-button"),
    btn_shoppingCart: () => cy.get("[data-icon='shopping-cart']"),
    lbl_shoppingCartNumber: () => cy.get(".fa-layers-counter"),
    lbl_subheader: () => cy.get(".subheader"),
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
    btn_addToCart: () => cy.get(".btn_primary.btn_inventory"),
    btn_addToCartByName: (name: string) => cy.get('.inventory_item_label').contains(`${name}`).parents('.inventory_item').find('.pricebar').find('button'),
    btn_itemByName: (name: string) => cy.get('.inventory_item_label').contains(`${name}`),
    lbl_priceByName: (name: string) => cy.get('.inventory_item_label').contains(`${name}`).parents('.inventory_item').find('.pricebar').children('.inventory_item_price'),
    lbl_descriptionByName: (name: string) => cy.get('.inventory_item').children('.inventory_item_label').contains(`${name}`).next('.inventory_item_desc'),
    lbl_price: () => cy.get(".inventory_item_price"),
    lbl_itemName_Parent: () => cy.get(".inventory_item_name"),
    lbl_productCaption: () => cy.get(".product_label"),
    dd_sorting: () => cy.get('.product_sort_container')
}

export const product = {
    btn_back: () => cy.get(".inventory_details_back_button"),
    btn_addToCart: () => cy.get(".btn_primary").contains('ADD TO CART'),
    btn_removeFromCart: () => cy.get(".btn_secondary"),
    lbl_productName: () => cy.get(".inventory_details_name"),
    lbl_productPrice: () => cy.get(".inventory_details_price"),
    lbl_productDesription: () => cy.get(".inventory_details_desc"),
}

export const cart = {
    btn_removeFromCart: () => cy.get(".btn_secondary.cart_button"),
    btn_continueShopping: () => cy.get(".btn_secondary").contains('Continue Shopping'),
    lbl_productName: () => cy.get(".inventory_item_name"),
    lbl_productDescription: () => cy.get(".inventory_item_desc"),
    lbl_productPrice: () => cy.get('.inventory_item_price'),
    lbl_cartItem: () => cy.get(".cart_item")
}

export const checkout = {
    btn_checkout: () => cy.get(".checkout_button"),
    btn_cancel: () => cy.get(".cart_cancel_link"),
    btn_continue: () => cy.get(".cart_button[type='submit']"),
    btn_finish: () => cy.get('.btn_action').contains('FINISH'),
    inp_firstName: () => cy.get('[data-test="firstName"]'),
    inp_lastName: () => cy.get('[data-test="lastName"]'),
    inp_zipCode: () => cy.get('[data-test="postalCode"]'),
    lbl_thankYou: () => cy.get('.complete-header'),
    lbl_checkoutError: () => cy.get('[data-test="error"]'),
    img_ponyExpress: () => cy.get('.pony_express')
}