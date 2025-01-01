const { Wishlist } = require('../../models');

const addToWishlist = async (req, res) => {
  try {
    const { propertyId, propertyType } = req.body;
    const userId = req.userId;

    // Check if the property is already in the wishlist
    const existingItem = await Wishlist.findOne({ where: { userId, propertyId, propertyType } });
    if (existingItem) {
      return res.status(400).json({ message: 'Property already in wishlist' });
    }

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
    const userId = req.userId;

    const wishlistItem = await Wishlist.findOne({ where: { id, userId } });
    if (!wishlistItem) {
      return res.status(404).json({ message: 'Wishlist item not found' });
    }

    await wishlistItem.destroy();
    res.status(200).json({ message: 'Property removed from wishlist' });
  } catch (error) {
    console.error('Error removing from wishlist:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const getWishlist = async (req, res) => {
  try {
    const userId = req.userId;

    const wishlist = await Wishlist.findAll({ where: { userId } });
    res.status(200).json({ wishlist });
  } catch (error) {
    console.error('Error fetching wishlist:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = { addToWishlist, removeFromWishlist, getWishlist };
