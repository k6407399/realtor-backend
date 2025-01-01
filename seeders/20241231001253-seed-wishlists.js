'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Wishlists', [
      {
        userId: 1,
        propertyType: 'Land',
        propertyId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 2,
        propertyType: 'Flats',
        propertyId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 3,
        propertyType: 'Villas',
        propertyId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 1,
        propertyType: 'Apartments',
        propertyId: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 2,
        propertyType: 'Land',
        propertyId: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Wishlists', null, {});
  },
};
