import { LayoutPage as LP } from '../page-objects';

describe('1) COMMON: LAYOUT', () => {

  it('1.0: Visits the "Movies" site', () => {
    cy.visit(Cypress.env('homeUrl'));
  });

  it('1.1: Home link is visible', () => {
    LP.homeLink().should('be.visible');
    LP.homeLinkIcon().should('be.visible');
    LP.homeLinkText()
      .should('contain', 'Movies')
      .should('be.visible');
  });

  it('1.2: Search form is visible', () => {
    LP.searchFormIcon().should('be.visible');
    LP.searchFormInput().should('be.visible');
  });

  it('1.3.1: Locale dropdown is visible', function () {
    LP.dropdownToggleLocale()
      .should('contain', Cypress.env('defaultLanguageValue'))
      .should('be.visible')
      .click();

    LP.dropdownMenuLocale().should('be.visible');
    LP.dropdownItem().should('have.length', 2);
    LP.dropdownItem('EN').should('be.visible');
    LP.dropdownItem('RU').should('be.visible');
  });

  it('1.3.2: Locale dropdown value can be changed', () => {
    LP.dropdownItem('RU').click();
  });

  it('1.3.3: Url has changed by locale dropdown', () => {
    cy.location('search').should('equal', '?lng=ru')
  });
})