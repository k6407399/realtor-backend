module.exports = (sequelize, DataTypes) => {
  const Flats = sequelize.define('Flats', {
    propertyId: {
      type: DataTypes.STRING(12), // e.g., PF123456789
      allowNull: false,
      unique: true,
      validate: {
        is: /^PF\d{9}$/, // Regex to ensure format is PF followed by 9 digits
      },
    },
    propertyType: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'Flat',
      validate: {
        isIn: [['Flat']], // Restrict to 'Flat' only
      },
    },
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
    approvalStatus: {
      type: DataTypes.ENUM('Pending', 'Approved', 'Rejected'),
      allowNull: false,
      defaultValue: 'Pending',
    },
    reason: { 
      type: DataTypes.STRING, // Stores the reason for rejection
      allowNull: true,
    },
    listedBy: {
      type: DataTypes.ENUM('user', 'admin'),
      allowNull: false,
    },
    userId: {
      type: DataTypes.STRING(5),
      allowNull: true,
      references: {
        model: 'Users', // Refers to the `User` table
        key: 'id',
      },
    },
    adminId: { type: DataTypes.INTEGER, allowNull: true },
  });

  Flats.associate = (models) => {
    Flats.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
    Flats.belongsTo(models.Admin, { foreignKey: 'adminId', as: 'admin' });
  };

  // Hook to generate propertyId before creation
  Flats.beforeCreate(async (flat, options) => {
    const randomId = Math.floor(Math.random() * 1e9).toString().padStart(9, '0');
    flat.propertyId = `PF${randomId}`;
  });

  return Flats;
};
