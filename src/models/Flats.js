module.exports = (sequelize, DataTypes) => {
  const Flats = sequelize.define('Flats', {
    area: { type: DataTypes.FLOAT, allowNull: false },
    facing: { type: DataTypes.STRING, allowNull: true },
    bedrooms: { type: DataTypes.INTEGER, allowNull: true },
    balcony: { type: DataTypes.BOOLEAN, allowNull: true },
    bathrooms: { type: DataTypes.INTEGER, allowNull: true },
    lift: { type: DataTypes.BOOLEAN, allowNull: true },
    parking: { type: DataTypes.BOOLEAN, allowNull: true },
    fourWheelerParking: { type: DataTypes.BOOLEAN, allowNull: true },
    powerBackup: { type: DataTypes.BOOLEAN, allowNull: true },
    pricePerSqft: { type: DataTypes.FLOAT, allowNull: false },
    totalPrice: { type: DataTypes.FLOAT, allowNull: false },
    location: { type: DataTypes.STRING, allowNull: false },
    pinCode: { type: DataTypes.STRING, allowNull: false },
    city: { type: DataTypes.STRING, allowNull: false },
    state: { type: DataTypes.STRING, allowNull: false },
    country: { type: DataTypes.STRING, allowNull: false, defaultValue: 'India' },
    photos: { type: DataTypes.JSON, allowNull: true },
    videos: { type: DataTypes.JSON, allowNull: true },
    status: { type: DataTypes.STRING, defaultValue: 'Available' },
    approvalStatus: { type: DataTypes.ENUM('Pending', 'Approved', 'Rejected'), allowNull: false, defaultValue: 'Pending' },
    reason: { 
      type: DataTypes.STRING, // Stores the reason for rejection
      allowNull: true 
    },
    listedBy: { type: DataTypes.ENUM('user', 'admin'), allowNull: false },
    userId: { type: DataTypes.INTEGER, allowNull: true },
    adminId: { type: DataTypes.INTEGER, allowNull: true },
  });

  /* Flats.associate = (models) => {
    Flats.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
    //Flats.belongsTo(models.Admin, { foreignKey: 'adminId', as: 'admin' });
    Flats.belongsTo(require('./Admin'), { foreignKey: 'adminId', as: 'admin' });
  }; */

  return Flats;
};
