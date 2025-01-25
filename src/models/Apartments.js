module.exports = (sequelize, DataTypes) => {
  const Apartments = sequelize.define('Apartments', {
    propertyId: {
      type: DataTypes.STRING(12), // Format: "PAB*********" (PAB + 9 numeric digits)
      allowNull: false,
      unique: true,
      validate: {
        is: /^PAB\d{9}$/, // Ensures the format is "PAB" followed by 9 digits
      },
    },
    propertyType: {
      type: DataTypes.STRING, // Fixed value "Apartments" for this model
      allowNull: false,
      defaultValue: 'Apartments',
      validate: {
        isIn: [['Apartments']], // Restrict to "Apartments"
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
    adminId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  });

  /* Associations */
  Apartments.associate = (models) => {
    Apartments.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
    Apartments.belongsTo(models.Admin, { foreignKey: 'adminId', as: 'admin' });
  };

  /* Hook to generate propertyId before creation */
  Apartments.beforeCreate(async (apartment, options) => {
    const randomId = Math.floor(Math.random() * 1e9).toString().padStart(9, '0');
    apartment.propertyId = `PAB${randomId}`;
  });

  return Apartments;
};
