const express = require('express');
require('dotenv').config();
require('../models'); // Load models
const bodyParser = require('body-parser');
const adminRoutes = require('./routes/adminRoutes');
const userRoutes = require('./routes/userRoutes');
const propertyRoutes = require('./routes/propertyRoutes');
const appointmentRoutes = require('./routes/appointmentRoutes');
const likeRoutes = require('./routes/likeRoutes');
const wishlistRoutes = require('./routes/wishlistRoutes');
const cors = require('cors');
const path = require('path');

const app = express();

// Enable CORS for all routes
app.use(cors());

// Middleware for parsing JSON bodies
app.use(express.json());
app.use(bodyParser.json());

// Serve static files
app.use('/static', express.static(path.join(__dirname, '../static')));

// Routes
app.use('/api/v1/admin', adminRoutes);
app.use('/api/v1/users', userRoutes); 
app.use('/api/v1/properties', propertyRoutes); // Handles Lands, Flats, Villas, Apartments
app.use('/api/v1/appointments', appointmentRoutes);
app.use('/api/v1/likes', likeRoutes);
app.use('/api/v1/wishlist', wishlistRoutes);

// Error handling middleware (Optional but recommended)
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({ message: err.message || 'Internal Server Error' });
});

module.exports = app;
