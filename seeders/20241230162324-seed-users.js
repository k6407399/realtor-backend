'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        mobileNumber: '1234567890',
        name: 'John Doe',
        otp: '1234',
        isBlocked: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        mobileNumber: '9876543210',
        name: 'Jane Smith',
        otp: '5678',
        isBlocked: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        mobileNumber: '1122334455',
        name: 'Alice Johnson',
        otp: '4321',
        isBlocked: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  },
};
