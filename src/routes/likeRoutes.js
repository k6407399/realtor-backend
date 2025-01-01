const express = require('express');
const { likeProperty, unlikeProperty, getLikes } = require('../controllers/likeController');
const { authenticateUser } = require('../middlewares/authMiddleware');
const router = express.Router();

// Like a property
router.post('/', authenticateUser, likeProperty);

// Unlike a property
router.delete('/:id', authenticateUser, unlikeProperty);

// Get liked properties
router.get('/', authenticateUser, getLikes);

module.exports = router;
