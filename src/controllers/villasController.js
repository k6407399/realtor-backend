const path = require("path");
const { Villas, Like, Wishlist } = require('../../models');

// Utility function to generate property IDs for villas
const generatePropertyId = () => {
  const numericPart = Math.floor(100000000 + Math.random() * 900000000); // 9 digits
  return `PV${numericPart}`; // Format: PV*********
};

// Create a new Villa property
const createVilla = async (req, res) => {
  try {
    console.log("Files received:", req.files);

    const listedBy = req.userId ? "user" : "admin";
    const userId = req.userId || null;
    const adminId = req.userId ? null : 1; // Default admin ID if not uploaded by a user

    const approvalStatus = listedBy === "user" ? "Pending" : "Approved";
    const status = listedBy === "user" ? "Pending" : "Available";

    const photos = req.files?.photos?.map((file) => file.path.replace("static/", "")) || [];
    const videos = req.files?.videos?.map((file) => file.path.replace("static/", "")) || [];

    // Generate a unique property ID for the villa
    const propertyId = generatePropertyId();

    // Create the property
    const villa = await Villas.create({
      ...req.body,
      propertyId,
      propertyType: "Villas", // Fixed value for this model
      photos,
      videos,
      listedBy,
      userId,
      adminId,
      approvalStatus,
      status,
    });

    res.status(201).json({ message: "Villa created successfully", villa });
  } catch (error) {
    console.error("Error creating villa:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

// Get all villas
const getVillas = async (req, res) => {
  try {
    const userId = req.userId || null;

    const villas = await Villas.findAll();

    if (userId) {
      // Enhance properties with user-specific likes and wishlists for logged-in users
      const enhancedVillas = await Promise.all(
        villas.map(async (villa) => {
          const isLiked = !!(await Like.findOne({ where: { userId, propertyId: villa.propertyId, propertyType: 'Villas' } }));
          const isWishlisted = !!(await Wishlist.findOne({ where: { userId, propertyId: villa.propertyId, propertyType: 'Villas' } }));

          return {
            ...villa.toJSON(),
            isLiked,
            isWishlisted,
          };
        })
      );
      return res.status(200).json({ villas: enhancedVillas });
    }

    // If not authenticated, return villas without user-specific data
    res.status(200).json({ villas });
  } catch (error) {
    console.error('Error fetching villas:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Get a single villa by propertyId
const getVillaById = async (req, res) => {
  try {
    const { id: propertyId } = req.params; // Updated to match `propertyId` instead of primary key
    const villa = await Villas.findOne({ where: { propertyId } }); // Search by `propertyId`
    if (!villa) {
      return res.status(404).json({ message: 'Villa not found' });
    }
    res.status(200).json({ villa });
  } catch (error) {
    console.error('Error fetching villa:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Update a villa record by propertyId
const updateVilla = async (req, res) => {
  try {
    const { id: propertyId } = req.params;
    const villa = await Villas.findOne({ where: { propertyId } }); // Search by `propertyId`
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

// Delete a villa record by propertyId
const deleteVilla = async (req, res) => {
  try {
    const { id: propertyId } = req.params;
    const villa = await Villas.findOne({ where: { propertyId } }); // Search by `propertyId`
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
