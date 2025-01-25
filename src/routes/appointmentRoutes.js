const express = require('express');
const {
  bookAppointment,
  getAppointments,
  updateAppointmentStatus,
  bookUserAppointment,
  getUserAppointments,
  updateUserAppointmentStatus
} = require('../controllers/appointmentController');
const { authenticateUser } = require('../middlewares/authMiddleware');

const router = express.Router();

// Admin-specific routes
router.post('/', bookAppointment);
router.get('/', getAppointments);
router.put('/:id', updateAppointmentStatus);

// User-specific routes
router.post('/user/appointment', authenticateUser, bookUserAppointment);
router.get('/user/appointments', authenticateUser, getUserAppointments);
router.put('/user/appointments/:id', authenticateUser, updateUserAppointmentStatus);

module.exports = router;
