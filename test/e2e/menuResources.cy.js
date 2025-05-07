import { accessResourcesDrawer, checkDrawerLength, getItemsCount, getItemsTypes } from './helpers'

describe('Resources - Menu', function () {
  beforeEach(function () {
    cy.getData().then(data => {
      const drawerExtensions = Object.values(data.course).filter(value => {
        if (!value || typeof value !== 'object') return;

        return Object.keys(value).some(key => key === '_drawerOrder');
      });

      this.multiDrawer = drawerExtensions.length > 1;
    });

    cy.visit('/');
    cy.get('button.nav__drawer-btn').click();
  });

  it(`should show the correct number of items`, function () {
    accessResourcesDrawer(this.multiDrawer);
    checkDrawerLength(this.data.course._resources?._resourcesItems?.length);
  });

  it('should display the correct amount of items in each tab', function () {
    accessResourcesDrawer(this.multiDrawer);
    cy.get('button.is-selected[id="resources__show-all"]').should('exist');

    const itemTypes = getItemsTypes(this.data.course._resources?._resourcesItems);
    const itemsCount = getItemsCount(this.data.course._resources?._resourcesItems, itemTypes);

    itemTypes.forEach((type) => {
      cy.get(`button[id="resources__show-${type}"]`).should('exist').click();
      checkDrawerLength(itemsCount[type], type);
    });
  });

  it('should display the correct resource items', function () {
    accessResourcesDrawer(this.multiDrawer);
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
    accessResourcesDrawer(this.multiDrawer);
    cy.get('button.drawer__close-btn').click();
    cy.get('.drawer').should('have.attr', 'aria-expanded', 'false');
  });

  it('should be able to close the drawer by hitting ESC', () => {
    accessResourcesDrawer(this.multiDrawer);
    cy.get('.drawer').type('{esc}');
    cy.get('.drawer').should('have.attr', 'aria-expanded', 'false');
  });
});
