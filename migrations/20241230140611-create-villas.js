"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Villas", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      area: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      facing: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      bedrooms: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      balcony: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      bathrooms: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      lift: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      parking: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      fourWheelerParking: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      powerBackup: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      pricePerSqft: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      totalPrice: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      location: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      pinCode: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      city: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      state: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      country: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: "India",
      },
      photos: {
        type: Sequelize.JSON,
        allowNull: true,
      },
      videos: {
        type: Sequelize.JSON,
        allowNull: true,
      },
      status: {
        type: Sequelize.STRING,
        defaultValue: "Available",
      },
      approvalStatus: {
        type: Sequelize.ENUM("Pending", "Approved", "Rejected"),
        allowNull: false,
        defaultValue: "Pending",
      },
      reason: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      listedBy: {
        type: Sequelize.ENUM("user", "admin"),
        allowNull: false,
      },
      userId: {
        type: Sequelize.STRING,
        allowNull: true,
        references: {
          model: "Users",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
      adminId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "Admins",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Villas");
  },
};
