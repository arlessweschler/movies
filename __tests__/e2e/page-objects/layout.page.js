const homeLink = '[data-test=home-link]';
const homeLinkIcon = '[data-test=home-link__icon]';
const homeLinkText = '[data-test=home-link__text]';

const searchFormIcon = '[data-test=search-form__icon]';
const searchFormInput = '[data-test=search-form__input]';

const dropdownToggleLocale = '[data-test=dropdown-toggle--locale]';
const dropdownMenuLocale = '[data-test=dropdown-menu--locale]';
const dropdownItem = '[data-test=dropdown-item]';

const LayoutPage = {
  homeLink: () => cy.get(homeLink),
  searchFormIcon: () => cy.get(searchFormIcon),
  searchFormInput: () => cy.get(searchFormInput),
  dropdownToggleLocale: () => cy.get(dropdownToggleLocale),
  dropdownMenuLocale: () => cy.get(dropdownMenuLocale),

  homeLinkIcon() {
    return this.homeLink().find(homeLinkIcon);
  },

  homeLinkText() {
    return this.homeLink().find(homeLinkText);
  },

  dropdownItem(lang) {
    const el = this.dropdownMenuLocale().find(dropdownItem);
    if (!lang) return el;
    return el.contains(lang);
  },
};

export default LayoutPage;