const path = require("path");
const { sequelize, Sequelize, Appointment, User } = require('../../models');
const { Op } = require('sequelize'); // Import Op for operators

// Dynamically require models
const models = {
  Land: require('../../src/models/Land')(sequelize, Sequelize.DataTypes),
  Flats: require('../../src/models/Flats')(sequelize, Sequelize.DataTypes),
  Villas: require('../../src/models/Villas')(sequelize, Sequelize.DataTypes),
  Apartments: require('../../src/models/Apartments')(sequelize, Sequelize.DataTypes),
};

// Book an appointment
const bookAppointment = async (req, res) => {
  try {
    const { propertyType, propertyId, date } = req.body;
    const userId = req.userId;

    // Validate property type
    if (!models[propertyType]) {
      return res.status(400).json({ message: 'Invalid property type' });
    }

    const appointment = await Appointment.create({ userId, propertyType, propertyId, date });
    res.status(201).json({ message: 'Appointment booked successfully', appointment });
  } catch (error) {
    console.error('Error booking appointment:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Get all appointments (Admin)
const getAppointments = async (req, res) => {
  try {
    const { view } = req.query;

    // Filter logic based on 'view' (day, week, month)
    let filter = {};
    const currentDate = new Date();

    if (view === 'day') {
      // Filter for today
      const startOfDay = new Date(currentDate.setHours(0, 0, 0, 0)); // Start of the day
      const endOfDay = new Date(currentDate.setHours(23, 59, 59, 999)); // End of the day

      filter.date = { [Op.between]: [startOfDay, endOfDay] };
    } else if (view === 'week') {
      // Filter for this week
      const startOfWeek = new Date(currentDate);
      startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());
      startOfWeek.setHours(0, 0, 0, 0); // Start of the week

      const endOfWeek = new Date(startOfWeek);
      endOfWeek.setDate(startOfWeek.getDate() + 6);
      endOfWeek.setHours(23, 59, 59, 999); // End of the week

      filter.date = { [Op.between]: [startOfWeek, endOfWeek] };
    } else if (view === 'month') {
      // Filter for this month
      const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1); // Start of the month
      const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0); // End of the month
      endOfMonth.setHours(23, 59, 59, 999);

      filter.date = { [Op.between]: [startOfMonth, endOfMonth] };
    }

    // Fetch appointments with the applied filter
    const appointments = await Appointment.findAll({
      where: filter,
      include: [{ model: User, as: 'user', attributes: ['id', 'name', 'mobileNumber'] }],
    });

    res.status(200).json({ appointments });
  } catch (error) {
    console.error('Error fetching appointments:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Update appointment status (Admin)
const updateAppointmentStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const appointment = await Appointment.findByPk(id);
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    appointment.status = status;
    await appointment.save();

    res.status(200).json({ message: `Appointment ${status.toLowerCase()} successfully`, appointment });
  } catch (error) {
    console.error('Error updating appointment status:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = { bookAppointment, getAppointments, updateAppointmentStatus };
