describe('Resources', () => {
  const checkDrawerLength = (count) => {
    cy.get('.drawer__item').not('.u-display-none').should('have.length', count);
  };

  const populateItemCounts = () => {
    this.itemTypes = this.resourceItems.reduce((types, item) => {
      if (!types.includes(item.type)) {
        types.push(item.type);
      }

      return types;
    }, []);

    this.itemTypes.forEach(type => {
      this.itemsCount[type] = this.resourceItems.filter(item => item?._type === type).count();
    });
  };

  beforeEach(() => {
    cy.getConfig();
    this.resourceItems = this.config?._resources?._resourcesItems || [];
    populateItemCounts();

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
      const resourceItem = this.resourceItems[index];

      cy.get($item).within(() => {
        cy.get('.drawer__item-title').should('contain', resourceItem.title);
        cy.get('.drawer__item-body').should('contain', resourceItem.description);
        cy.get('a').should('have.attr', 'target', '_blank').should('have.attr', 'href', resourceItem._link);
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
