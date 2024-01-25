import { checkDrawerLength, getItemsCount, getItemsTypes } from './helpers'

describe('Resources - Pages', () => {
  beforeEach(() => {
    cy.getData();
    this.pages = this.data.contentObjects.filter(item => item._type === 'page');
    this.courseResourceItems = this.data.course._resources._resourcesItems || [];

    cy.visit('/');
  });

  it(`should show the correct number of items on each page`, () => {
    this.pages.forEach(page => {
      const pageResourceItems = page?.get('_resources')?._resourceItems || {};
      const resourceItems = { ...pageResourceItems, ...this.courseResourceItems };

      cy.get('button[data-event="toggleDrawer"]').click();
      checkDrawerLength(resourceItems.length);
    });
  });

  it('should display the correct amount of items in each tab for each page', () => {
    this.pages.forEach(page => {
      const pageResourceItems = page?.get('_resources')?._resourceItems || {};
      const resourceItems = { ...pageResourceItems, ...this.courseResourceItems };

      const itemTypes = getItemsTypes(resourceItems);
      const itemsCount = getItemsCount(resourceItems, itemTypes);

      cy.get('button[data-event="toggleDrawer"]').click();
      cy.get('button.is-selected[id="resources__show-all"]').should('exist');

      itemTypes.forEach((type) => {
        it(`should display ${itemsCount[type]} items in the '${type}' tab`, () => {
          cy.get(`button[id="resources__show-${type}"]`).should('exist').click();
          checkDrawerLength(itemsCount[type]);
        });
      });
    });
  });

  it('should display the correct resource items on each page', () => {
    this.pages.forEach(page => {
      const pageResourceItems = page?.get('_resources')?._resourceItems || {};
      const resourceItems = { ...pageResourceItems, ...this.courseResourceItems };

      cy.get('button[data-event="toggleDrawer"]').click();

      cy.get('.drawer__item').each(($item, index) => {
        const { _link, description, title } = resourceItems[index];

        cy.get($item).within(() => {
          if (title) {
            cy.get('.drawer__item-title').should('contain', title);
          } else {
            cy.get('.drawer__item-title').should('not.exist');
          }

          if (description) {
            cy.get('drawer__item-body').should('contain', description);
          } else {
            cy.get('drawer__item-body').should('not.exist');
          }

          cy.get('a').should('have.attr', 'target', '_blank').should('have.attr', 'href', _link);
        });
      });
    });
  });

  it('should be able to close the drawer by clicking X on each page', () => {
    this.pages.forEach(page => {
      cy.get('button[data-event="toggleDrawer"]').click();
      cy.get('button.drawer__close-btn').click();
      cy.get('.drawer').should('have.attr', 'aria-expanded', 'false');
    });
  });

  it('should be able to close the drawer by hitting ESC on each page', () => {
    this.pages.forEach(page => {
      cy.get('button[data-event="toggleDrawer"]').click();
      cy.get('.drawer').type('{esc}');
      cy.get('.drawer').should('have.attr', 'aria-expanded', 'false');
    });
  });
});