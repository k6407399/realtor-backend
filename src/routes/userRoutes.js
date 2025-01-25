const express = require("express");
const { sendOtp, verifyOtp, getAllUsers } = require("../controllers/userController");
const { getUserProfile, updateUserProfile } = require('../controllers/userController');
const { authenticateUser } = require('../middlewares/authMiddleware');

const router = express.Router();

// Route to send OTP
router.post("/send-otp", sendOtp);

// Route to verify OTP
router.post("/verify-otp", verifyOtp);

// Route to fetch all users
router.get('/', getAllUsers);

// Route to fetch user profile
router.get('/profile', authenticateUser, getUserProfile);

// Route to update user profile
router.put('/profile', authenticateUser, updateUserProfile);

module.exports = router;
