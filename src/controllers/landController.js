const path = require("path");
const { Land, Like, Wishlist } = require('../../models');
const { v4: uuidv4 } = require('uuid'); // For generating unique IDs if needed

// Utility function to generate property IDs for lands
const generatePropertyId = () => {
  const numericPart = Math.floor(100000000 + Math.random() * 900000000); // 9 digits
  return `PL${numericPart}`;
};

// Create a new land property
const createLand = async (req, res) => {
  try {
    console.log("Files received:", req.files);

    const listedBy = req.userId ? "user" : "admin";
    const userId = req.userId || null;
    const adminId = req.userId ? null : 1; // Default admin ID if not uploaded by a user

    const approvalStatus = listedBy === "user" ? "Pending" : "Approved";
    const status = listedBy === "user" ? "Pending" : "Available";

    const photos = req.files?.photos?.map((file) => file.path.replace("static/", "")) || [];
    const videos = req.files?.videos?.map((file) => file.path.replace("static/", "")) || [];

    // Generate a unique property ID for the land
    const propertyId = generatePropertyId();

    // Create the property
    const land = await Land.create({
      ...req.body,
      propertyId,
      propertyType: "Land", // Fixed value for this model
      photos,
      videos,
      listedBy,
      userId,
      adminId,
      approvalStatus,
      status,
    });

    res.status(201).json({ message: "Land created successfully", land });
  } catch (error) {
    console.error("Error creating land:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

// Get all lands
const getLands = async (req, res) => {
  try {
    const userId = req.userId || null;

    const lands = await Land.findAll();

    if (userId) {
      // Enhance properties with user-specific likes and wishlists for logged-in users
      const enhancedLands = await Promise.all(
        lands.map(async (land) => {
          const isLiked = !!(await Like.findOne({ where: { userId, propertyId: land.propertyId, propertyType: 'Land' } }));
          const isWishlisted = !!(await Wishlist.findOne({ where: { userId, propertyId: land.propertyId, propertyType: 'Land' } }));

          return {
            ...land.toJSON(),
            isLiked,
            isWishlisted,
          };
        })
      );
      return res.status(200).json({ lands: enhancedLands });
    }

    // If not authenticated, return lands without user-specific data
    res.status(200).json({ lands });
  } catch (error) {
    console.error('Error fetching lands:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Get a single land by propertyId
const getLandById = async (req, res) => {
  try {
    const { id: propertyId } = req.params; // Updated to match `propertyId` instead of primary key
    const land = await Land.findOne({ where: { propertyId } }); // Search by `propertyId`
    if (!land) {
      return res.status(404).json({ message: 'Land not found' });
    }
    res.status(200).json({ land });
  } catch (error) {
    console.error('Error fetching land:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Update a land record by propertyId
const updateLand = async (req, res) => {
  try {
    const { id: propertyId } = req.params;
    const land = await Land.findOne({ where: { propertyId } }); // Search by `propertyId`
    if (!land) {
      return res.status(404).json({ message: 'Land not found' });
    }
    await land.update(req.body); // Update with `req.body`
    res.status(200).json({ message: 'Land updated successfully', land });
  } catch (error) {
    console.error('Error updating land:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Delete a land record by propertyId
const deleteLand = async (req, res) => {
  try {
    const { id: propertyId } = req.params;
    const land = await Land.findOne({ where: { propertyId } }); // Search by `propertyId`
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
