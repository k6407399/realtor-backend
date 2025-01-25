// src/routes/wishlistRoutes.js
const express = require('express');
const { addToWishlist, removeFromWishlist, getWishlist } = require('../controllers/wishlistController');
const { authenticateUser } = require('../middlewares/authMiddleware');
const router = express.Router();

/**
 * POST /api/v1/wishlist
 * Endpoint to add a property to the wishlist
 */
router.post('/', authenticateUser, addToWishlist);

/**
 * DELETE /api/v1/wishlist/:id
 * Endpoint to remove a property from the wishlist by Wishlist ID
 */
router.delete('/:id', authenticateUser, removeFromWishlist);

/**
 * GET /api/v1/wishlist
 * Endpoint to retrieve all wishlist items for the authenticated user
 */
router.get('/', authenticateUser, getWishlist);

module.exports = router;
