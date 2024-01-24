import { checkDrawerLength, getItemsDetails } from './helpers'

describe('Resources - Menu Page', () => {
  beforeEach(() => {
    cy.getData();
    this.resourceItems = this.data.course._resources._resourcesItems || [];
    const { itemTypes, itemsCount } = getItemsDetails(this.resourceItems);

    cy.visit('/');
    cy.get('button[data-event="toggleDrawer"]').click();
  });

  it(`should show ${this.resourceItems.length} items`, () => {
    checkDrawerLength(this.resourceItems.length);
  });

  it('should display the correct amount of items in each tab', () => {
    cy.get('button.is-selected[id="resources__show-all"]').should('exist');

    this.itemTypes.forEach((type) => {
      it(`should display ${this.itemsCount[type]} items in the '${type}' tab`, () => {
        cy.get(`button[id="resources__show-${type}"]`).should('exist').click();
        checkDrawerLength(this.itemsCount[type]);
      });
    });
  });

  it('should display the correct resource items', () => {
    cy.get('.drawer__item').each(($item, index) => {
      const { _link, description, title } = this.resourceItems[index];

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

  it('should be able to close the drawer by clicking X', () => {
    cy.get('button.drawer__close-btn').click();
    cy.get('.drawer').should('have.attr', 'aria-expanded', 'false');
  });

  it('should be able to close the drawer by hitting ESC', () => {
    cy.get('.drawer').type('{esc}');
    cy.get('.drawer').should('have.attr', 'aria-expanded', 'false');
  });
});
