const path = require("path");
const { Apartments } = require('../../models');

const createApartment = async (req, res) => {
  try {
    // Determine who is creating the property
    const listedBy = req.adminId ? "admin" : "user";
    const userId = req.userId || null;
    const adminId = req.adminId || null;

    // Save file paths for photos and videos
    const photos = req.files?.photos?.map((file) => file.path.replace("static/", "")) || [];
    const videos = req.files?.videos?.map((file) => file.path.replace("static/", "")) || [];

    // Create the apartment with required fields
    const apartment = await Apartments.create({
      ...req.body, // Include all data from the request body
      photos,
      videos,
      listedBy,
      userId,
      adminId,
    });

    res.status(201).json({ message: "Apartment created successfully", apartment });
  } catch (error) {
    console.error("Error creating apartment:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

const getApartments = async (req, res) => {
  try {
    const apartments = await Apartments.findAll();
    res.status(200).json({ apartments });
  } catch (error) {
    console.error('Error fetching apartments:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const getApartmentById = async (req, res) => {
  try {
    const { id } = req.params;
    const apartment = await Apartments.findByPk(id);
    if (!apartment) {
      return res.status(404).json({ message: 'Apartment not found' });
    }
    res.status(200).json({ apartment });
  } catch (error) {
    console.error('Error fetching apartment:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const updateApartment = async (req, res) => {
  try {
    const { id } = req.params;
    const apartment = await Apartments.findByPk(id);
    if (!apartment) {
      return res.status(404).json({ message: 'Apartment not found' });
    }
    await apartment.update(req.body);
    res.status(200).json({ message: 'Apartment updated successfully', apartment });
  } catch (error) {
    console.error('Error updating apartment:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const deleteApartment = async (req, res) => {
  try {
    const { id } = req.params;
    const apartment = await Apartments.findByPk(id);
    if (!apartment) {
      return res.status(404).json({ message: 'Apartment not found' });
    }
    await apartment.destroy();
    res.status(200).json({ message: 'Apartment deleted successfully' });
  } catch (error) {
    console.error('Error deleting apartment:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = {
  createApartment,
  getApartments,
  getApartmentById,
  updateApartment,
  deleteApartment,
};
