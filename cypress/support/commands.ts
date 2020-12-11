Cypress.Commands.add('disableScreenshot', () => {
  Cypress.Screenshot.defaults({
      screenshotOnRunFailure: false
  });
});
