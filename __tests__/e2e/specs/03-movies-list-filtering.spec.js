import { MoviesListPage as MLP } from '../page-objects';

describe('3) MOVIES LIST: FILTERING', () => {

  it('3.1: Movies filter can be changed to "Top rated"', () => {
    cy.visit(Cypress.env('homeUrl'));
    MLP.listCard().should('have.length', 20);

    MLP.filterMovies('.top_rated');
  });

  it('3.2: Active filter button has changed by movies filter', () => {
    MLP.moviesFilterBtn('.top_rated')
      .should('have.class', 'active');
  });

  it('3.3: Url has changed by movies filter', () => {
    cy.url().should('include', 'moviesType=top_rated');
  });

  it('3.4: First movie card filtered by "Top rated" has title, genres and rating', () => {
    MLP.checkFirstMovieCard();
  });
})