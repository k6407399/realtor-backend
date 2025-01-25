'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Appointments', [
      {
        userId: 'U0001', // Matches John Doe's ID
        propertyType: 'Land',
        propertyId: 'PL000000001', // Matches new Land ID format
        date: '2025-01-01 10:00:00',
        status: 'Confirmed',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 'U0002', // Matches Jane Smith's ID
        propertyType: 'Flats',
        propertyId: 'PF000000002', // Matches new Flats ID format
        date: '2025-01-02 11:00:00',
        status: 'Rescheduled',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 'U0003', // Matches Alice Johnson's ID
        propertyType: 'Villas',
        propertyId: 'PV000000003', // Matches new Villas ID format
        date: '2025-01-03 14:00:00',
        status: 'Cancelled',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 'U0001', // Matches John Doe's ID
        propertyType: 'Apartments',
        propertyId: 'PAB000000004', // Matches new Apartments ID format
        date: '2025-01-04 15:00:00',
        status: 'Confirmed',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 'U0002', // Matches Jane Smith's ID
        propertyType: 'Land',
        propertyId: 'PL000000005', // Matches new Land ID format
        date: '2025-01-05 16:00:00',
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
