module.exports = (sequelize, DataTypes) => {
  const Like = sequelize.define('Like', {
    userId: {
      type: DataTypes.STRING(5),
      allowNull: true,
      references: {
        model: 'Users', // Refers to the `User` table
        key: 'id',
      },
    },
    propertyId: {
      type: DataTypes.STRING(12), // Format: "PL*********", "PF*********", "PV*********", "PAB*********"
      allowNull: false,
      validate: {
        is: /^(PL|PF|PV|PAB)\d{9}$/i, // Ensures the format matches the property type prefix and 9 digits
      },
    },
    propertyType: {
      type: DataTypes.ENUM('Land', 'Flats', 'Villas', 'Apartments'),
      allowNull: false,
      validate: {
        isIn: [['Land', 'Flats', 'Villas', 'Apartments']],
      },
    },
  });

  Like.associate = (models) => {
    Like.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
  };

  return Like;
};
