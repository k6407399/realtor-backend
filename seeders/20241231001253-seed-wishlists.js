'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Wishlists', [
      {
        userId: 'U0001', // Matches John Doe's ID
        propertyType: 'Land',
        propertyId: 'PL000000001',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 'U0002', // Matches Jane Smith's ID
        propertyType: 'Flats',
        propertyId: 'PF000000002',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 'U0003', // Matches Alice Johnson's ID
        propertyType: 'Villas',
        propertyId: 'PV000000003',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 'U0001', // Matches John Doe's ID
        propertyType: 'Apartments',
        propertyId: 'PAB000000004',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 'U0002', // Matches Jane Smith's ID
        propertyType: 'Land',
        propertyId: 'PL000000005',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Wishlists', null, {});
  },
};
