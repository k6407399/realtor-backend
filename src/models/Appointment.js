module.exports = (sequelize, DataTypes) => {
  const Appointment = sequelize.define('Appointment', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    propertyType: {
      type: DataTypes.ENUM('Land', 'Flats', 'Villas', 'Apartments'),
      allowNull: false,
    },
    propertyId: {
      type: DataTypes.INTEGER,
      allowNull: false,
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

  Appointment.associate = (models) => {
    Appointment.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
  };

  return Appointment;
};