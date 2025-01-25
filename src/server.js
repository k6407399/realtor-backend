const app = require('./app');
const { sequelize } = require('../models'); // Adjust the path if necessary

const PORT = process.env.PORT || 5000;

(async () => {
  try {
    // Sync the database schema
    await sequelize.sync({ alter: true }); // Use `force: true` for destructive resync; `alter: true` for safe schema updates
    console.log('Database connected and tables synced successfully');

    // Start the server
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (err) {
    console.error('Database connection or server startup error:', err);
  }
})();
