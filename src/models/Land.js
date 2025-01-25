module.exports = (sequelize, DataTypes) => {
  const Land = sequelize.define('Land', {
    propertyId: {
      type: DataTypes.STRING(12), // Format: "PL*********" (PL + 9 numeric digits)
      allowNull: false,
      unique: true,
      validate: {
        is: /^PL\d{9}$/, // Ensures the format is "PL" followed by 9 digits
      },
    },
    propertyType: {
      type: DataTypes.STRING, // Fixed value "Land" for this model
      allowNull: false,
      defaultValue: 'Land',
      validate: {
        isIn: [['Land']], // Restrict to "Land"
      },
    },
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
    approvalStatus: {
      type: DataTypes.ENUM('Pending', 'Approved', 'Rejected'),
      allowNull: false,
      defaultValue: 'Pending',
    },
    reason: {
      type: DataTypes.STRING,
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
        model: 'Users', // Refers to the `Users` table
        key: 'id',
      },
    },
    adminId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  });

  /* Associations */
  Land.associate = (models) => {
    Land.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
    Land.belongsTo(models.Admin, { foreignKey: 'adminId', as: 'admin' });
  };

  /* Hook to generate propertyId before creation */
  Land.beforeCreate(async (land, options) => {
    const randomId = Math.floor(Math.random() * 1e9).toString().padStart(9, '0');
    land.propertyId = `PL${randomId}`;
  });

  return Land;
};
