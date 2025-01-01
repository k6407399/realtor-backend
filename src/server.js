// src/server.js
const app = require('./app');
const { sequelize } = require('../models'); // Adjust the path if necessary

const PORT = process.env.PORT || 5000;

// Sync database and start server
sequelize
  .sync({ alter: false }) // Use `force: true` to drop and recreate tables; `alter: true` to update schema
  .then(() => {
    console.log('Database connected and tables synced');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Database connection error:', err);
  });


/* const app = require('./app');
const { sequelize } = require('../models');

const PORT = process.env.PORT || 5000;

sequelize
  .sync({ alter: true })
  .then(() => {
    console.log('Database connected and models synced');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Database connection error:', err);
  }); */
