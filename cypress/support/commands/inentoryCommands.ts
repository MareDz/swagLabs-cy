import { productDetailsUrl } from "../../utils/strings"
import { inventory, product } from "../locators"

export {}
declare global {
  namespace Cypress {
    interface Chainable<Subject = any> {
      openAndAssertProductDetails(item: string): Chainable<void>
      assertAllProducts(): Chainable<void>

    }
  }
}

/*
-Find desired item/product
-Get displayed price and displayed description
-Open product and verify if name, price and description are all the same as in inventory page
*/
Cypress.Commands.add('openAndAssertProductDetails', (item) => {
  let price: number

  cy.log(`Opening product page for: ${item}`);

  // Retrieve price form inventory
  inventory.lbl_priceByName(item)
    .invoke('text')
    .then(text => {
        price = Number(text.replace(/\$/g, ''))
    }).as('getPrice')

  // Retrieve name from inventory
  inventory.lbl_descriptionByName(item)
    .invoke('text')
    .as('getDescription')
      
  // Assert data in product details page
  cy.get('@getPrice').then(() => {
    cy.get('@getDescription').then((description) => {
      inventory.btn_itemByName(item).click()
      cy.assertUrl(productDetailsUrl)

      product.lbl_productName().should('contain.text', item)
      product.lbl_productDesription().should('have.text', description)
      product.lbl_productPrice()
        .invoke('text')
        .then(text => {
          const productPrice = Number(text.replace(/\$/g, ''))
          expect(price).to.be.eq(productPrice)
        })
      })
    })
})

/*
-Get number of all displayed items 
-Get name for each individual product and push it to array
-Verify content for each item in Inventory and Details page [ For each element of array perform cy.(openAndAssertProductDetails('Name of that product')) ]
*/
Cypress.Commands.add('assertAllProducts', () => {
  let listOfProducts: string[] = []

  inventory.lbl_itemName_Parent().its('length').then((numberOfProducts) => {
    console.log(numberOfProducts)

    for(let i=0; i<numberOfProducts; i++){
      inventory.lbl_itemName_Parent()
      .eq(i)
      .invoke('text')
      .then((productName) => {
        listOfProducts.push(productName)
      })
    }
  }).then(() => {
    console.log(listOfProducts)
    listOfProducts.forEach((productName) => {
      cy.openAndAssertProductDetails(productName)
      product.btn_back().click()
    })
  })
})