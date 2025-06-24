export const openResourceDrawer = (multiDrawer) => {
  cy.get('button.nav__drawer-btn').click();
  if (!multiDrawer) return;

  // Should click into resources if multiple extension/drawer items present
  cy.task('log', `Found multiple drawer items. Clicking into resources`);
  cy.get('button.drawer__menu-btn.drawer__item-btn.is-resources').click({ force: true });
}

export const checkDrawerLength = (count, filter = 'All', title = 'Menu Page') => {
  cy.task('log', ` - Checking '${filter}' filter contains ${count} items on page '${title}'`);
  cy.get('.drawer__item').not('.u-display-none').should('have.length', count);
};

export const getIsMultItemDrawer = (data) => {
  const drawerExtensions = Object.values(data.course).filter(value => {
    if (!value || typeof value !== 'object') return;
    return Object.keys(value).some(key => key === '_drawerOrder');
  });

  return drawerExtensions.length > 1;
};

export const getItemsTypes = (resourceItems) => {
  return resourceItems.reduce((types, item) => {
    if (!types.includes(item._type)) {
      types.push(item._type);
    }

    return types;
  }, []);
};

export const getItemsCount = (resourceItems, itemsTypes) => {
  const itemsCount = {};

  itemsTypes.forEach(type => {
    itemsCount[type] = resourceItems.filter(item => item?._type === type).length;
  });

  return itemsCount;
};
