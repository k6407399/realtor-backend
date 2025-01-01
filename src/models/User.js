module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    mobileNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    otp: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    isBlocked: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  });

  // Remove associations if Wishlist and Like models are not used
  User.associate = (models) => {
    // Add associations only for existing models if needed in the future
  };

  return User;
};
