import { checkDrawerLength, getItemsCount, getItemsTypes } from './helpers'

describe('Resources - Pages', function () {
  beforeEach(function () {
    cy.getData();

    this.courseResourcesItems = this.data.course._resources?._resourcesItems || [];
    this.pages = this.data.contentObjects.filter(item => item._type === 'page');
  });

  it(`should show the correct number of items on each page`, function () {
    this.pages.forEach((page, index) => {
      cy.visit(`#/id/${page._id}`);

      const pageResourceItems = page._resources?._resourceItems || [];
      const resourceItems = [ ...this.courseResourcesItems, ...pageResourceItems ];

      cy.get('.menu-item__button').eq(index).click();
      cy.get('button[data-event="toggleDrawer"]').click();

      checkDrawerLength(resourceItems.length, 'All', page.displayTitle);
    });
  });

  it('should display the correct amount of items in each tab for each page', function () {
    this.pages.forEach((page, index) => {
      cy.visit(`#/id/${page._id}`);

      const pageResourceItems = page._resources?._resourceItems || [];
      const resourceItems = [ ...this.courseResourcesItems, ...pageResourceItems ];

      const itemTypes = getItemsTypes(resourceItems);
      const itemsCount = getItemsCount(resourceItems, itemTypes);

      cy.get('.menu-item__button').eq(index).click();
      cy.get('button[data-event="toggleDrawer"]').click();
      cy.get('button.is-selected[id="resources__show-all"]').should('exist');

      itemTypes.forEach((type) => {
        cy.get(`button[id="resources__show-${type}"]`).should('exist').click();
        checkDrawerLength(itemsCount[type], type, page.displayTitle);
      });
    });
  });

  it('should display the correct resource items on each page', function () {
    this.pages.forEach((page, index) => {
      cy.visit(`#/id/${page._id}`);

      const pageResourceItems = page._resources?._resourceItems || [];
      const resourceItems = [ ...this.courseResourcesItems, ...pageResourceItems ];

      cy.get('.menu-item__button').eq(index).click();
      cy.get('button[data-event="toggleDrawer"]').click();

      cy.get('.drawer__item').each(($item, index) => {
        const { _link, description, title } = resourceItems[index];

        cy.get($item).within(() => {
          cy.testContainsOrNotExists('.resources__item-title', title);
          cy.testContainsOrNotExists('.resources__item-body', description);

          cy.get('a').should('have.attr', 'target', '_blank').should('have.attr', 'href', _link);
        });
      });
    });
  });

  it('should be able to close the drawer by clicking X on each page', function () {
    this.pages.forEach((page, index) => {
      cy.visit(`#/id/${page._id}`);

      cy.get('.menu-item__button').eq(index).click();
      cy.get('button[data-event="toggleDrawer"]').click();
      cy.get('button.drawer__close-btn').click();
      cy.get('.drawer').should('have.attr', 'aria-expanded', 'false');
    });
  });

  it('should be able to close the drawer by hitting ESC on each page', function () {
    this.pages.forEach((page, index) => {
      cy.visit(`#/id/${page._id}`);

      cy.get('.menu-item__button').eq(index).click();
      cy.get('button[data-event="toggleDrawer"]').click();
      cy.get('.drawer').type('{esc}');
      cy.get('.drawer').should('have.attr', 'aria-expanded', 'false');
    });
  });
});
