module.exports = (sequelize, DataTypes) => {
  const Land = sequelize.define('Land', {
    area: { type: DataTypes.FLOAT, allowNull: false },
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
      type: DataTypes.STRING,
      allowNull: true 
    },
    listedBy: { type: DataTypes.ENUM('user', 'admin'), allowNull: false },
    userId: { type: DataTypes.INTEGER, allowNull: true },
    adminId: { type: DataTypes.INTEGER, allowNull: true },
  });

  /* Land.associate = (models) => {
    Land.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
    //Land.belongsTo(models.Admin, { foreignKey: 'adminId', as: 'admin' });
    Land.belongsTo(require('./Admin'), { foreignKey: 'adminId', as: 'admin' });
  }; */

  return Land;
};
