const { Land } = require('../../models');

// Create a new land property
// Create a new land property
const createLand = async (req, res) => {
  try {
    // Determine who is creating the property
    const listedBy = req.adminId ? "admin" : "user";
    const userId = req.userId || null;
    const adminId = req.adminId || null;

    // Create the land property with required fields
    const land = await Land.create({
      ...req.body, // Include all data from the request body
      listedBy,
      userId,
      adminId,
    });

    res.status(201).json({ message: "Land created successfully", land });
  } catch (error) {
    console.error("Error creating land:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};
/* const createLand = async (req, res) => {
  try {
    const land = await Land.create(req.body); // Directly create using req.body
    res.status(201).json({ message: 'Land created successfully', land });
  } catch (error) {
    console.error('Error creating land:', error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
}; */

// Get all lands
const getLands = async (req, res) => {
  try {
    const lands = await Land.findAll(); // Fetch all land records
    res.status(200).json({ lands });
  } catch (error) {
    console.error('Error fetching lands:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Get a single land by ID
const getLandById = async (req, res) => {
  try {
    const { id } = req.params;
    const land = await Land.findByPk(id); // Find by primary key
    if (!land) {
      return res.status(404).json({ message: 'Land not found' });
    }
    res.status(200).json({ land });
  } catch (error) {
    console.error('Error fetching land:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Update a land record
const updateLand = async (req, res) => {
  try {
    const { id } = req.params;
    const land = await Land.findByPk(id); // Find the record
    if (!land) {
      return res.status(404).json({ message: 'Land not found' });
    }
    await land.update(req.body); // Update with req.body
    res.status(200).json({ message: 'Land updated successfully', land });
  } catch (error) {
    console.error('Error updating land:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Delete a land record
const deleteLand = async (req, res) => {
  try {
    const { id } = req.params;
    const land = await Land.findByPk(id); // Find the record
    if (!land) {
      return res.status(404).json({ message: 'Land not found' });
    }
    await land.destroy(); // Delete the record
    res.status(200).json({ message: 'Land deleted successfully' });
  } catch (error) {
    console.error('Error deleting land:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = {
  createLand,
  getLands,
  getLandById,
  updateLand,
  deleteLand,
};
