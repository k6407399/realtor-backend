'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Approvals', [
      {
        propertyType: 'Land',
        propertyId: 1,
        status: 'Approved',
        reason: null,
        adminId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        propertyType: 'Flats',
        propertyId: 2,
        status: 'Pending',
        reason: null,
        adminId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        propertyType: 'Villas',
        propertyId: 3,
        status: 'Rejected',
        reason: 'Incomplete documentation',
        adminId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        propertyType: 'Apartments',
        propertyId: 4,
        status: 'Approved',
        reason: null,
        adminId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        propertyType: 'Land',
        propertyId: 5,
        status: 'Pending',
        reason: null,
        adminId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Approvals', null, {});
  },
};
//npx sequelize db:seed --seed 20241231001253-seed-approvals.js