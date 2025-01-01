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
const app = express();
const cors = require('cors');

app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Parse JSON bodies

app.use(bodyParser.json());

app.use('/api/v1/admin', adminRoutes);
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/properties', propertyRoutes);
app.use('/api/v1/appointments', appointmentRoutes);
app.use('/api/v1/likes', likeRoutes);
app.use('/api/v1/wishlist', wishlistRoutes);

module.exports = app;
