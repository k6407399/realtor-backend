'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Appointments', [
      {
        userId: 1,
        propertyType: 'Land',
        propertyId: 1,
        date: '2024-01-01 10:00:00',
        status: 'Confirmed',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 2,
        propertyType: 'Flats',
        propertyId: 2,
        date: '2024-01-02 11:00:00',
        status: 'Rescheduled',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 3,
        propertyType: 'Villas',
        propertyId: 3,
        date: '2024-01-03 14:00:00',
        status: 'Canceled',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 1,
        propertyType: 'Apartments',
        propertyId: 4,
        date: '2024-01-04 15:00:00',
        status: 'Confirmed',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 2,
        propertyType: 'Land',
        propertyId: 5,
        date: '2024-01-05 16:00:00',
        status: 'Confirmed',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Appointments', null, {});
  },
};
