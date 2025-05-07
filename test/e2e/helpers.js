export const accessResourcesDrawer = (multiDrawer) => {
  if (!multiDrawer) return;

  // Should click into resources if multiple extension/drawer items present
  cy.task('log', `Found multiple drawer items. Clicking into resources`);
  cy.get('button.drawer__menu-btn.drawer__item-btn.is-resources').click();
}

export const checkDrawerLength = (count, filter = 'All', title = 'Menu Page') => {
  cy.task('log', ` - Checking '${filter}' filter contains ${count} items on page '${title}'`);
  cy.get('.drawer__item').not('.u-display-none').should('have.length', count);
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
