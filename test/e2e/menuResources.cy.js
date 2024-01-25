import { checkDrawerLength, getItemsCount, getItemsTypes } from './helpers'

describe('Resources - Menu', function () {
  beforeEach(function () {
    cy.getData().then((data) => {
      this.courseResourcesItems = data.course._resources?._resourcesItems || [];

      cy.visit('/');
      cy.get('button[data-event="toggleDrawer"]').click();
    });
  });

  it(`should show the correct number of items`, function () {
    checkDrawerLength('All', this.courseResourcesItems.length);
  });

  it('should display the correct amount of items in each tab', function () {
    cy.get('button.is-selected[id="resources__show-all"]').should('exist');

    const itemTypes = getItemsTypes(this.courseResourcesItems);
    const itemsCount = getItemsCount(this.courseResourcesItems, itemTypes);

    itemTypes.forEach((type) => {
      cy.get(`button[id="resources__show-${type}"]`).should('exist').click();
      checkDrawerLength(type, itemsCount[type]);
    });
  });

  it('should display the correct resource items', function () {
    cy.get('.drawer__item').each(function ($item, index) {
      const { _link, description, title } = this.courseResourcesItems[index];

      cy.get($item).within(() => {
        if (title) {
          cy.get('.resources__item-title').should('contain', title);
        } else {
          cy.get('.resources__item-title').should('not.exist');
        }

        if (description) {
          cy.get('.resources__item-body').should('contain', description);
        } else {
          cy.get('.resources__item-body').should('not.exist');
        }

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
