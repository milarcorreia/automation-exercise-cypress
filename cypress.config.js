const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://automationexercise.com',
    specPattern: 'cypress/e2e/**/*.cy.js',
    supportFile: 'cypress/support/e2e.js',
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
      return config;
    },
  },
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    reportDir: 'cypress/reports',
    charts: true,
    reportPageTitle: 'Pós-graduação | Automation Exercise',
    embeddedScreenshots: true,
    inlineAssets: true,
    saveAllAttempts: false,
  },
  defaultCommandTimeout: 12000,
  pageLoadTimeout: 60000,
  requestTimeout: 20000,
  responseTimeout: 30000,
  retries: { runMode: 1, openMode: 0 },
  video: true,
  screenshotOnRunFailure: true,
  viewportWidth: 1440,
  viewportHeight: 900,
  chromeWebSecurity: true,
});
