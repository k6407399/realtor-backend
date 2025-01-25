'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const users = [
      {
        id: 'U5555',
        mobileNumber: '9008153399',
        name: 'Ravi Kumar Kondru',
        isBlocked: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'U0002',
        mobileNumber: '9876543210',
        name: 'Jane Smith',
        isBlocked: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'U0003',
        mobileNumber: '1122334455',
        name: 'Alice Johnson',
        isBlocked: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'U0004',
        mobileNumber: '5566778899',
        name: 'Bob Brown',
        isBlocked: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'U0005',
        mobileNumber: '6677889900',
        name: 'Emma Wilson',
        isBlocked: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    for (const user of users) {
      try {
        // Check if the user exists
        const existingUser = await queryInterface.rawSelect(
          'Users',
          {
            where: { mobileNumber: user.mobileNumber },
          },
          ['id']
        );

        // Insert only if the user doesn't exist
        if (!existingUser) {
          await queryInterface.bulkInsert('Users', [user]);
        } else {
          console.log(`User with mobileNumber ${user.mobileNumber} already exists. Skipping.`);
        }
      } catch (error) {
        console.error(`Error inserting user ${user.mobileNumber}:`, error);
      }
    }
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
  },
};
