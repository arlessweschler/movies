describe('LAYOUT TEST SUITE', () => {

  it('Visits the "Movies" site', () => {
    cy.visit(Cypress.env('baseUrl'));
  })

  it('Checks for home link', () => {
    cy.get('.home-link__icon').should('be.visible');
    cy.get('.home-link__text')
      .contains('Movies')
      .should('be.visible');
  })

  it('Checks for search form', () => {
    cy.get('.search-form__icon').should('be.visible');
    cy.get('.search-form__input').should('be.visible');
  })

  it('Checks for locale dropdown', () => {
    cy.get('.dropdown-toggle--locale')
      .contains(Cypress.env('defaultLanguageValue'))
      .should('be.visible')
      .click()

    cy.get('.dropdown-menu--locale')
      .should('be.visible')
      .find('.dropdown-item')
      .should('have.length', 2)

    cy.get('.dropdown-menu--locale')
      .find('.dropdown-item')
      .contains('EN')
      .should('be.visible');

    cy.get('.dropdown-menu--locale')
      .find('.dropdown-item')
      .contains('RU')
      .should('be.visible');
  })

  it('Checks for RU locale click changes url', () => {
    cy.get('.dropdown-menu--locale')
      .find('.dropdown-item')
      .contains('RU')
      .click()

    cy.url().should('include', 'lng=ru')
  })
})