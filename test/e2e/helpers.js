export const checkDrawerLength = (count) => {
  cy.get('.drawer__item').not('.u-display-none').should('have.length', count);
};

export const getItemsDetails = (resourceItems) => {
  const itemTypes = resourceItems.reduce((types, item) => {
    if (!types.includes(item.type)) {
      types.push(item.type);
    }

    return types;
  }, []);

  const itemsCount = {};

  itemTypes.forEach(type => {
    itemsCount[type] = resourceItems.filter(item => item?._type === type).count();
  });

  return {
    itemTypes,
    itemsCount
  }
};
