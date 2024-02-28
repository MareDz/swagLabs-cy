import { defineConfig } from 'cypress'

export default defineConfig({
  projectId: "pm4jhx",

  // viewportHeight: 1080,
  // viewportWidth: 1920,

  e2e: {
    baseUrl: "https://www.saucedemo.com/v1",
    specPattern: 'cypress/tests/**/**.{js,jsx,ts,tsx}',
    supportFile: 'cypress/support/e2e.js', 
    retries: 0,
    watchForFileChanges: false,
    waitForAnimations: true,
    execTimeout: 60000,
    pageLoadTimeout: 60000,
    requestTimeout: 35000,
    responseTimeout: 35000,
    video: true,
  },
})
