import { MoviesListPage as MLP } from '../page-objects';

describe('2) MOVIES LIST: LAYOUT', () => {

  it('2.0: Visits the movies list route', () => {
    cy.visit(Cypress.env('homeUrl'));
  });

  it('2.1: Movies list has 20 movie cards per page', () => {
    MLP.listCard().should('have.length', 20);
  });

  it('2.2.1: Movies filter is visible', () => {
    MLP.moviesFilter().should('be.visible');
    MLP.moviesFilterBtn().should('have.length', 4);

    MLP.moviesFilterBtn('[data-test=now_playing]').should('be.visible');
    MLP.moviesFilterBtn('[data-test=popular]').should('be.visible');
    MLP.moviesFilterBtn('[data-test=top_rated]').should('be.visible');
    MLP.moviesFilterBtn('[data-test=upcoming]').should('be.visible');
  });

  it('2.2.2: "Now playing" movies type is active by default', () => {
    MLP.moviesFilterBtn('[data-test=now_playing]').should('have.class', 'active');
  });

  it('2.3.1: Pagination is visible', () => {
    MLP.pagination().should('be.visible');
    MLP.paginationLinkPrev().should('be.visible');
    MLP.paginationLinkNext().should('be.visible');
    MLP.paginationLinkActive().should('be.visible');
  });

  it('2.3.2: Page 1 is active by default', () => {
    MLP.paginationLinkActive().should('contain', 1);
  });

  it('2.4: First movie card filtered by "Now playing" has title, genres and rating', () => {
    MLP.checkFirstMovieCard();
  });
})