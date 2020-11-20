const homeLink = '.home-link';
const homeLinkIcon = '.home-link__icon';
const homeLinkText = '.home-link__text';

const searchFormIcon = '.search-form__icon';
const searchFormInput = '.search-form__input';

const dropdownToggleLocale = '.dropdown-toggle--locale';
const dropdownMenuLocale = '.dropdown-menu--locale';
const dropdownItem = '.dropdown-item';

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