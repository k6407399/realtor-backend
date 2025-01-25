const { v4: uuidv4 } = require('uuid');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.STRING(5),
      allowNull: false,
      primaryKey: true,
      defaultValue: () => uuidv4().slice(0, 5), // Generates a 5-character string ID
    },
    mobileNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    isBlocked: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  });

  User.associate = (models) => {
    User.hasMany(models.Land, { foreignKey: 'userId' });
    User.hasMany(models.Flats, { foreignKey: 'userId' });
    User.hasMany(models.Villas, { foreignKey: 'userId' });
    User.hasMany(models.Apartments, { foreignKey: 'userId' });
    User.hasMany(models.Wishlist, { foreignKey: 'userId' });
    User.hasMany(models.Like, { foreignKey: 'userId' });
    User.hasMany(models.Appointment, { foreignKey: 'userId' });
  };

  return User;
};
