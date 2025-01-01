const express = require('express');
const { adminLogin, fetchBlocklist, toggleBlockUser } = require('../controllers/adminController');
const router = express.Router();

// Admin Login
router.post('/login', adminLogin);

// Fetch Blocklist
router.get('/blocklist', fetchBlocklist);

// Block or unblock a user
router.put('/users/:id/block', toggleBlockUser);

module.exports = router;

