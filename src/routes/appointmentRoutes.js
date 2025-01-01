const express = require('express');
const {
  bookAppointment,
  getAppointments,
  updateAppointmentStatus,
} = require('../controllers/appointmentController');
const { authenticateUser } = require('../middlewares/authMiddleware');

const router = express.Router();

// User routes
router.post('/', authenticateUser, bookAppointment);

// Admin routes
router.get('/', getAppointments);
router.put('/:id', updateAppointmentStatus);

module.exports = router;
