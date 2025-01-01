const { Villas } = require('../../models');

const createVilla = async (req, res) => {
  try {
    // Determine who is creating the property
    const listedBy = req.adminId ? "admin" : "user";
    const userId = req.userId || null;
    const adminId = req.adminId || null;

    // Create the villa with required fields
    const villa = await Villas.create({
      ...req.body, // Include all data from the request body
      listedBy,
      userId,
      adminId,
    });

    res.status(201).json({ message: "Villa created successfully", villa });
  } catch (error) {
    console.error("Error creating villa:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

const getVillas = async (req, res) => {
  try {
    const villas = await Villas.findAll();
    res.status(200).json({ villas });
  } catch (error) {
    console.error('Error fetching villas:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const getVillaById = async (req, res) => {
  try {
    const { id } = req.params;
    const villa = await Villas.findByPk(id);
    if (!villa) {
      return res.status(404).json({ message: 'Villa not found' });
    }
    res.status(200).json({ villa });
  } catch (error) {
    console.error('Error fetching villa:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const updateVilla = async (req, res) => {
  try {
    const { id } = req.params;
    const villa = await Villas.findByPk(id);
    if (!villa) {
      return res.status(404).json({ message: 'Villa not found' });
    }
    await villa.update(req.body);
    res.status(200).json({ message: 'Villa updated successfully', villa });
  } catch (error) {
    console.error('Error updating villa:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const deleteVilla = async (req, res) => {
  try {
    const { id } = req.params;
    const villa = await Villas.findByPk(id);
    if (!villa) {
      return res.status(404).json({ message: 'Villa not found' });
    }
    await villa.destroy();
    res.status(200).json({ message: 'Villa deleted successfully' });
  } catch (error) {
    console.error('Error deleting villa:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = {
  createVilla,
  getVillas,
  getVillaById,
  updateVilla,
  deleteVilla,
};
