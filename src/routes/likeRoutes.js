// src/routes/likeRoutes.js
const express = require('express');
const { likeProperty, unlikeProperty, getLikes } = require('../controllers/likeController');
const { authenticateUser } = require('../middlewares/authMiddleware');
const router = express.Router();

/**
 * POST /api/v1/likes
 * Endpoint to like a property
 */
router.post('/', authenticateUser, likeProperty);

/**
 * DELETE /api/v1/likes/:id
 * Endpoint to unlike a property by Like ID
 */
router.delete('/:id', authenticateUser, unlikeProperty);

/**
 * GET /api/v1/likes
 * Endpoint to retrieve all likes for the authenticated user
 */
router.get('/', authenticateUser, getLikes);

module.exports = router;
