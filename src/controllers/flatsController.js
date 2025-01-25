const path = require("path");
const { Flats, Like, Wishlist } = require('../../models');

// Utility function to generate property IDs for flats
const generatePropertyId = () => {
  const numericPart = Math.floor(100000000 + Math.random() * 900000000); // 9 digits
  return `PF${numericPart}`; // Format: PF*********
};

// Create a new Flat property
const createFlat = async (req, res) => {
  try {
    console.log("Files received:", req.files);

    const listedBy = req.userId ? "user" : "admin";
    const userId = req.userId || null;
    const adminId = req.userId ? null : 1; // Default admin ID if not uploaded by a user

    const approvalStatus = listedBy === "user" ? "Pending" : "Approved";
    const status = listedBy === "user" ? "Pending" : "Available";

    const photos = req.files?.photos?.map((file) => file.path.replace("static/", "")) || [];
    const videos = req.files?.videos?.map((file) => file.path.replace("static/", "")) || [];

    // Generate a unique property ID for the flat
    const propertyId = generatePropertyId();

    // Create the property
    const flat = await Flats.create({
      ...req.body,
      propertyId,
      propertyType: "Flats", // Fixed value for this model
      photos,
      videos,
      listedBy,
      userId,
      adminId,
      approvalStatus,
      status,
    });

    res.status(201).json({ message: "Flat created successfully", flat });
  } catch (error) {
    console.error("Error creating flat:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

// Get all flats
const getFlats = async (req, res) => {
  try {
    const userId = req.userId || null;

    const flats = await Flats.findAll();

    if (userId) {
      // Enhance properties with user-specific likes and wishlists for logged-in users
      const enhancedFlats = await Promise.all(
        flats.map(async (flat) => {
          const isLiked = !!(await Like.findOne({ where: { userId, propertyId: flat.propertyId, propertyType: 'Flats' } }));
          const isWishlisted = !!(await Wishlist.findOne({ where: { userId, propertyId: flat.propertyId, propertyType: 'Flats' } }));

          return {
            ...flat.toJSON(),
            isLiked,
            isWishlisted,
          };
        })
      );
      return res.status(200).json({ flats: enhancedFlats });
    }

    // If not authenticated, return flats without user-specific data
    res.status(200).json({ flats });
  } catch (error) {
    console.error('Error fetching flats:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Get a single flat by propertyId
const getFlatById = async (req, res) => {
  try {
    const { id: propertyId } = req.params; // Updated to match `propertyId` instead of primary key
    const flat = await Flats.findOne({ where: { propertyId } }); // Search by `propertyId`
    if (!flat) {
      return res.status(404).json({ message: 'Flat not found' });
    }
    res.status(200).json({ flat });
  } catch (error) {
    console.error('Error fetching flat:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Update a flat record by propertyId
const updateFlat = async (req, res) => {
  try {
    const { id: propertyId } = req.params;
    const flat = await Flats.findOne({ where: { propertyId } }); // Search by `propertyId`
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

// Delete a flat record by propertyId
const deleteFlat = async (req, res) => {
  try {
    const { id: propertyId } = req.params;
    const flat = await Flats.findOne({ where: { propertyId } }); // Search by `propertyId`
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
