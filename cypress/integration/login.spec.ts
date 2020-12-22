describe('Login Test', () => {
    before(() => {
        cy.disableScreenshot();
    });
    it('Login integrity test', () => {
        cy.visit('/login');

        cy.get('auth-guest-start')
            .should('be.visible')
            .within(() => {
                cy.get('mat-tab-body form button[type="submit"]').should('have.text', 'ENTRAR');
            });
    })
})
