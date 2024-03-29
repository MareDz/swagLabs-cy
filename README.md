# swagLabs-cypress

- [Swag Labs](http://teststore.automationtesting.co.uk/) is demo application and this project is used only for demonstration purpose.
- This project contains automation tests for mentined application.

- Focus of this project is to demonstrate my **_Coding style, Cypress Best Practices Variable Naming Conventions, Code Organization and Organization of Test Cases_**.

# Getting Started

**1. Installation process**

- Before downloading [this Git repo](https://github.com/MareDz/swagLabs-cypress.git) you should have [Node.js](https://nodejs.org/en/download) installed
- Run following command to install dependencies `npm install`
- Run following command to start cypress `npx cypress open`

**2. API Reference**

- API services used on this project are open-source and completely free to use, they are used only for demonstration purpose.
- API [reference](https://randomuser.me/)

# General

- Tests for execution are located at [cypress/tests]([https://github.com/MareDz/mystore-pw-ts/tree/main/tests](https://github.com/MareDz/swagLabs-cypress/tree/main/cypress/tests)) directory.
- Cypress Commands are located at [support/commands](https://github.com/MareDz/swagLabs-cypress/tree/main/cypress/support/commands) directory.
- Commands that are used in multiple different places, we're keeping in [commands/globalCommands.ts](https://github.com/MareDz/swagLabs-cypress/blob/main/cypress/support/commands/globalCommands.ts) file.
- Locators are located at [support/locators.ts](https://github.com/MareDz/swagLabs-cypress/blob/main/cypress/support/locators.ts) file. Considering that this application is realy small, we're keeping locators in only one file to keep it simpler.
- Locators that are used in multiple different places, we're keeping in [base] object.
- Strings used for assertion are located at [utils/strings.ts](https://github.com/MareDz/swagLabs-cypress/blob/main/cypress/utils/strings.ts) file.
- External helper functions are stored at [utils/helpers.ts](https://github.com/MareDz/swagLabs-cypress/blob/main/cypress/utils/helpers.ts) file.
- Scripts for running individual specs, are located at [package.json/scripts](https://github.com/MareDz/swagLabs-cypress/blob/main/package.json) file.
