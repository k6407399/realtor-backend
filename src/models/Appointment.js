module.exports = (sequelize, DataTypes) => {
  const Appointment = sequelize.define('Appointment', {
    userId: {
      type: DataTypes.STRING(5),
      allowNull: true,
      references: {
        model: 'Users', // Refers to the `Users` table
        key: 'id',
      },
    },
    propertyType: {
      type: DataTypes.ENUM('Land', 'Flats', 'Villas', 'Apartments'),
      allowNull: false,
    },
    propertyId: {
      type: DataTypes.STRING(12), // Updated to match the new propertyId format
      allowNull: false,
      validate: {
        is: /^(PL|PF|PV|PAB)\d{9}$/i, // Ensures the format matches any property type (e.g., PL123456789)
      },
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('Confirmed', 'Rescheduled', 'Cancelled'),
      defaultValue: 'Confirmed',
    },
  });

  /* Associations */
  Appointment.associate = (models) => {
    Appointment.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
  };

  return Appointment;
};
