import { MoviesListPage as MLP } from '../page-objects';

describe('4) MOVIES LIST: PAGING', () => {

  it('4.1.1: Page number can be changed by clicking page 2 button', () => {
    cy.visit(`${Cypress.env('homeUrl')}?moviesType=top_rated&page=1`);
    MLP.listCard().should('have.length', 20);

    MLP.clickPageButton(2);
  });

  it('4.1.2: Url has changed by clicking page 2 button', () => {
    cy.url().should('include', 'page=2');
  });

  it('4.1.3: First movie card of page 2 has title, genres and rating', () => {
    MLP.checkFirstMovieCard();
  });

  it('4.2.1: Page number can be changed by clicking "next" page button', () => {
    MLP.clickPageNext();
  });

  it('4.2.2: Url has changed by clicking "next" page button', () => {
    cy.url().should('include', 'page=3');
  });

  it('4.2.3: First movie card of page 3 has title, genres and rating', () => {
    MLP.checkFirstMovieCard();
  });

  it('4.3.1: Page number can be changed by clicking "..." page button', () => {
    MLP.clickBreakPage();
  });

  it('4.3.2: Url has changed by clicking "..." page button', () => {
    cy.url().should('include', 'page=5');
  });

  it('4.3.3: First movie card of page 5 has title, genres and rating', () => {
    MLP.checkFirstMovieCard();
  });
})