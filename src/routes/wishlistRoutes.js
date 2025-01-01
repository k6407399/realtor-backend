const express = require('express');
const { addToWishlist, removeFromWishlist, getWishlist } = require('../controllers/wishlistController');
const { authenticateUser } = require('../middlewares/authMiddleware');
const router = express.Router();

// Add a property to the wishlist
router.post('/', authenticateUser, addToWishlist);

// Remove a property from the wishlist
router.delete('/:id', authenticateUser, removeFromWishlist);

// Fetch the user's wishlist
router.get('/', authenticateUser, getWishlist);

module.exports = router;
