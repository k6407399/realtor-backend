// src/controllers/wishlistController.js
const { Wishlist } = require('../../models');

const addToWishlist = async (req, res) => {
  try {
    const { propertyId, propertyType } = req.body;
    const userId = req.user.id; // Use req.user.id from authenticateUser middleware

    // Validate propertyId format based on propertyType
    const validPropertyIdRegex = {
      Land: /^PL\d{9}$/i,
      Flats: /^PF\d{9}$/i,
      Villas: /^PV\d{9}$/i,
      Apartments: /^PAB\d{9}$/i,
    };

    if (!validPropertyIdRegex[propertyType]?.test(propertyId)) {
      return res.status(400).json({ message: 'Invalid property ID format for the given property type.' });
    }

    // Check if the property is already in the wishlist
    const existingItem = await Wishlist.findOne({ where: { userId, propertyId, propertyType } });
    if (existingItem) {
      return res.status(400).json({ message: 'Property already in wishlist.' });
    }

    // Add the property to the wishlist
    const wishlistItem = await Wishlist.create({ userId, propertyId, propertyType });
    res.status(201).json({ message: 'Property added to wishlist', wishlistItem });
  } catch (error) {
    console.error('Error adding to wishlist:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const removeFromWishlist = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id; // Use req.user.id from authenticateUser middleware

    // Find the wishlist item
    const wishlistItem = await Wishlist.findOne({ where: { id, userId } });
    if (!wishlistItem) {
      return res.status(404).json({ message: 'Wishlist item not found.' });
    }

    // Remove the item from the wishlist
    await wishlistItem.destroy();
    res.status(200).json({ message: 'Property removed from wishlist.' });
  } catch (error) {
    console.error('Error removing from wishlist:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const getWishlist = async (req, res) => {
  try {
    const userId = req.user.id; // Use req.user.id from authenticateUser middleware
    console.log('Fetching wishlist for user ID:', userId);

    // Fetch all wishlist items for the user
    const wishlist = await Wishlist.findAll({ where: { userId } });
    console.log('Wishlist fetched:', wishlist);

    res.status(200).json({ wishlist });
  } catch (error) {
    console.error('Error fetching wishlist:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = { addToWishlist, removeFromWishlist, getWishlist };
