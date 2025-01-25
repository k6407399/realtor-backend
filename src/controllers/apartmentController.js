const path = require("path");
const { Apartments, Like, Wishlist } = require('../../models');

// Utility function to generate property IDs for apartments
const generatePropertyId = () => {
  const numericPart = Math.floor(100000000 + Math.random() * 900000000); // 9 digits
  return `PAB${numericPart}`; // Format: PAB*********
};

// Create a new Apartment property
const createApartment = async (req, res) => {
  try {
    console.log("Files received:", req.files);

    const listedBy = req.userId ? "user" : "admin";
    const userId = req.userId || null;
    const adminId = req.userId ? null : 1; // Default admin ID if not uploaded by a user

    const approvalStatus = listedBy === "user" ? "Pending" : "Approved";
    const status = listedBy === "user" ? "Pending" : "Available";

    const photos = req.files?.photos?.map((file) => file.path.replace("static/", "")) || [];
    const videos = req.files?.videos?.map((file) => file.path.replace("static/", "")) || [];

    // Generate a unique property ID for the apartment
    const propertyId = generatePropertyId();

    // Create the property
    const apartment = await Apartments.create({
      ...req.body,
      propertyId,
      propertyType: "Apartments", // Fixed value for this model
      photos,
      videos,
      listedBy,
      userId,
      adminId,
      approvalStatus,
      status,
    });

    res.status(201).json({ message: "Apartment created successfully", apartment });
  } catch (error) {
    console.error("Error creating apartment:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

// Get all apartments
const getApartments = async (req, res) => {
  try {
    const userId = req.userId || null;

    const apartments = await Apartments.findAll();

    if (userId) {
      // Enhance properties with user-specific likes and wishlists for logged-in users
      const enhancedApartments = await Promise.all(
        apartments.map(async (apartment) => {
          const isLiked = !!(await Like.findOne({ where: { userId, propertyId: apartment.propertyId, propertyType: 'Apartments' } }));
          const isWishlisted = !!(await Wishlist.findOne({ where: { userId, propertyId: apartment.propertyId, propertyType: 'Apartments' } }));

          return {
            ...apartment.toJSON(),
            isLiked,
            isWishlisted,
          };
        })
      );
      return res.status(200).json({ apartments: enhancedApartments });
    }

    // If not authenticated, return apartments without user-specific data
    res.status(200).json({ apartments });
  } catch (error) {
    console.error('Error fetching apartments:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Get a single apartment by propertyId
const getApartmentById = async (req, res) => {
  try {
    const { id: propertyId } = req.params; // Updated to match `propertyId` instead of primary key
    const apartment = await Apartments.findOne({ where: { propertyId } }); // Search by `propertyId`
    if (!apartment) {
      return res.status(404).json({ message: 'Apartment not found' });
    }
    res.status(200).json({ apartment });
  } catch (error) {
    console.error('Error fetching apartment:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Update an apartment record by propertyId
const updateApartment = async (req, res) => {
  try {
    const { id: propertyId } = req.params;
    const apartment = await Apartments.findOne({ where: { propertyId } }); // Search by `propertyId`
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

// Delete an apartment record by propertyId
const deleteApartment = async (req, res) => {
  try {
    const { id: propertyId } = req.params;
    const apartment = await Apartments.findOne({ where: { propertyId } }); // Search by `propertyId`
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
