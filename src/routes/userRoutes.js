const express = require('express');
const { signupUser, loginUser, getListings } = require('../controllers/userController');
const router = express.Router();

router.post('/signup', signupUser); // User signup route
router.post('/login', loginUser);   // User login route
router.get('/listings', getListings); // Get property listings (open to all users)

module.exports = router;
