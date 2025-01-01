const { Flats } = require('../../models');

const createFlat = async (req, res) => {
  try {
    // Determine who is creating the property
    const listedBy = req.adminId ? "admin" : "user";
    const userId = req.userId || null;
    const adminId = req.adminId || null;

    // Create the flat with required fields
    const flat = await Flats.create({
      ...req.body, // Include all data from the request body
      listedBy,
      userId,
      adminId,
    });

    res.status(201).json({ message: "Flat created successfully", flat });
  } catch (error) {
    console.error("Error creating flat:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

const getFlats = async (req, res) => {
  try {
    const flats = await Flats.findAll();
    res.status(200).json({ flats });
  } catch (error) {
    console.error('Error fetching flats:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const getFlatById = async (req, res) => {
  try {
    const { id } = req.params;
    const flat = await Flats.findByPk(id);
    if (!flat) {
      return res.status(404).json({ message: 'Flat not found' });
    }
    res.status(200).json({ flat });
  } catch (error) {
    console.error('Error fetching flat:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const updateFlat = async (req, res) => {
  try {
    const { id } = req.params;
    const flat = await Flats.findByPk(id);
    if (!flat) {
      return res.status(404).json({ message: 'Flat not found' });
    }
    await flat.update(req.body);
    res.status(200).json({ message: 'Flat updated successfully', flat });
  } catch (error) {
    console.error('Error updating flat:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const deleteFlat = async (req, res) => {
  try {
    const { id } = req.params;
    const flat = await Flats.findByPk(id);
    if (!flat) {
      return res.status(404).json({ message: 'Flat not found' });
    }
    await flat.destroy();
    res.status(200).json({ message: 'Flat deleted successfully' });
  } catch (error) {
    console.error('Error deleting flat:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = {
  createFlat,
  getFlats,
  getFlatById,
  updateFlat,
  deleteFlat,
};
