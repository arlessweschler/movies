const moviesFilter = '[data-test=movies-filter]';
const pagination = '.pagination-top';
const paginationLink = '.pagination__link';
const paginationLinkPrev = '.previous .pagination__link';
const paginationLinkNext = '.next .pagination__link';
const paginationLinkActive = '.active .pagination__link';
const paginationLinkBreak = '.break .pagination__link';

const moviesList = '[data-test=movies-list]';
const listCard = '[data-test=movie-card]';
const listCardTitle = '[data-test=movie-card__title]';
const listCardGenres = '[data-test=movie-card__genres]';
const listCardRating = '[data-test=movie-card__rating]';

const MoviesListPage = {
  moviesFilter: () => cy.get(moviesFilter),
  pagination: () => cy.get(pagination, { timeout: 20000 }),
  moviesList: () => cy.get(moviesList),

  moviesFilterBtn(selector) {
    if (!selector) return this.moviesFilter().find('.btn');
    return this.moviesFilter().find(selector);
  },

  paginationLinkPrev() {
    return this.pagination().find(paginationLinkPrev);
  },

  paginationLinkNext() {
    return this.pagination().find(paginationLinkNext);
  },

  paginationLinkBreak() {
    return this.pagination().find(paginationLinkBreak);
  },

  paginationLinkActive() {
    return this.pagination().find(paginationLinkActive);
  },

  clickPageButton(pageNum) {
    return this.pagination()
      .find(paginationLink)
      .contains(pageNum)
      .click();
  },

  clickPageNext() {
    return this.paginationLinkNext().click();
  },

  clickBreakPage() {
    return this.paginationLinkBreak().click();
  },

  listCard() {
    return this.moviesList().find(listCard);
  },

  listCardTitle(index) {
    return this.listCard().eq(index).find(listCardTitle);
  },

  listCardGenres(index) {
    return this.listCard().eq(index).find(listCardGenres);
  },

  listCardRating(index) {
    return this.listCard().eq(index).find(listCardRating);
  },

  filterMovies(type) {
    return this.moviesFilterBtn(type).click();
  },

  checkFirstMovieCard() {
    this.listCardTitle(0).should('be.visible');
    this.listCardGenres(0).should('be.visible');
    this.listCardRating(0).should('be.visible');
  }
};

export default MoviesListPage;