import { checkDrawerLength, getItemsCount, getItemsTypes } from './helpers'

describe('Resources - Menu', function () {
  beforeEach(function () {
    cy.getData();

    cy.visit('/');
    cy.get('button.nav__drawer-btn').click();
  });

  it(`should show the correct number of items`, function () {
    checkDrawerLength(this.data.course._resources?._resourcesItems?.length);
  });

  it('should display the correct amount of items in each tab', function () {
    cy.get('button.is-selected[id="resources__show-all"]').should('exist');

    const itemTypes = getItemsTypes(this.data.course._resources?._resourcesItems);
    const itemsCount = getItemsCount(this.data.course._resources?._resourcesItems, itemTypes);

    itemTypes.forEach((type) => {
      cy.get(`button[id="resources__show-${type}"]`).should('exist').click();
      checkDrawerLength(itemsCount[type], type);
    });
  });

  it('should display the correct resource items', function () {
    cy.get('.drawer__item').each(function ($item, index) {
      const { _link, description, title } = this.data.course._resources?._resourcesItems[index];

      cy.get($item).within(() => {
        cy.testContainsOrNotExists('.resources__item-title', title);
        cy.testContainsOrNotExists('.resources__item-body', description);

        cy.get('a').should('have.attr', 'target', '_blank').should('have.attr', 'href', _link);
      });
    });
  });

  it('should be able to close the drawer by clicking X', () => {
    cy.get('button.drawer__close-btn').click();
    cy.get('.drawer').should('have.attr', 'aria-expanded', 'false');
  });

  it('should be able to close the drawer by hitting ESC', () => {
    cy.get('.drawer').type('{esc}');
    cy.get('.drawer').should('have.attr', 'aria-expanded', 'false');
  });
});
