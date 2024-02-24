import { checkSortAscending, checkSortDescending } from "../../utils/helpers"
import { productDetailsUrl } from "../../utils/strings"
import { inventory, product } from "../locators"

export {}
declare global {
  namespace Cypress {
    interface Chainable<Subject = any> {
      openAndAssertProductDetails(item: string): Chainable<void>
      assertAllProducts(): Chainable<void>
      inventoryPriceSorting(order: string): Chainable<void>
    }
  }
}

/*
- Find desired item/product
- Get displayed price and displayed description
- Verify that item conten/values are same in Inventory and Product Details page [name, description, price]
*/
Cypress.Commands.add('openAndAssertProductDetails', (item) => {

  cy.log(`Opening product page for: ${item}`);

  // Retrieve price form inventory
  inventory.lbl_priceByName(item)
    .invoke('text')
    .then(text => {
      const price = Number(text.replace(/\$/g, ''))

      cy.wrap(price)
        .as('getPrice')

      // Retrieve name from inventory
      inventory.lbl_descriptionByName(item)
        .invoke('text')
        .as('getDescription')
    })

  // Assert data in product details page
  cy.get('@getDescription').then((description) => {
    cy.get('@getPrice').then((price) => {
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
- Get number of all displayed items 
- Get name for each individual product and push it to array
- Verify content/value for each item in Inventory and Details page [ For each element of array perform cy.(openAndAssertProductDetails('Name of that product')) ]
*/
Cypress.Commands.add('assertAllProducts', () => {
  let listOfProducts: string[] = []

  inventory.lbl_itemName_Parent().its('length')
    .then((numberOfProducts) => {
        console.log(numberOfProducts)

      for(let i=0; i<numberOfProducts; i++){
        inventory.lbl_itemName_Parent()
          .eq(i)
          .invoke('text')
          .then((productName) => {
            listOfProducts.push(productName)
          })
        }
      })
      .then(() => {
        console.log(listOfProducts)
        listOfProducts.forEach((productName) => {
        cy.openAndAssertProductDetails(productName)
        product.btn_back().click()
    })
  })
})

/*
- Give type of sorting
- Obtain number of elements
- Loop through each element, get the price, format it and push it to array
- Import external helpers checkSortAscending() and checkSortDescending() 
- Verify that sorting is done correctly
*/
Cypress.Commands.add('inventoryPriceSorting', (order) => {
  let numberOfArcticles: number
  let priceArray: number[] = []

  inventory.dd_sorting().select(order)

  inventory.lbl_price().its('length').then((length) => {
    numberOfArcticles = length
  })
  .then(() => {
    for(let i = 0; i < numberOfArcticles; i++){
      inventory.lbl_price().eq(i).invoke('text').then((text) => {
        const price = Number(text.replace(/\$/g, ''))
        priceArray.push(price)
      })
    }
  })
  .then(async () => {
    if(order === 'Price (low to high)'){
      expect(await checkSortAscending(priceArray)).to.be.true
    } else if (order == 'Price (high to low)'){
      expect(await checkSortDescending(priceArray)).to.be.true
    }
  })

})