export const checkDrawerLength = (count) => {
  cy.get('.drawer__item').not('.u-display-none').should('have.length', count);
};

export const getItemsTypes = (resourceItems) => {
  return resourceItems.reduce((types, item) => {
    if (!types.includes(item.type)) {
      types.push(item.type);
    }

    return types;
  }, []);
};

export const getItemsCount = (resourceItems, itemsTypes) => {
  const itemsCount = {};

  itemsTypes.forEach(type => {
    itemsCount[type] = resourceItems.filter(item => item?._type === type).count();
  });

  return itemsCount;
};
