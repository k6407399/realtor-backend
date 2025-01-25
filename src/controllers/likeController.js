// src/controllers/likeController.js
const { Like } = require('../../models');

const likeProperty = async (req, res) => {
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

    // Check if the property is already liked by the user
    const existingLike = await Like.findOne({ where: { userId, propertyId, propertyType } });
    if (existingLike) {
      return res.status(400).json({ message: 'Property already liked.' });
    }

    // Create a new like entry
    const like = await Like.create({ userId, propertyId, propertyType });
    res.status(201).json({ message: 'Property liked successfully', like });
  } catch (error) {
    console.error('Error liking property:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const unlikeProperty = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id; // Use req.user.id from authenticateUser middleware

    // Find the like entry
    const like = await Like.findOne({ where: { id, userId } });
    if (!like) {
      return res.status(404).json({ message: 'Like not found.' });
    }

    // Delete the like entry
    await like.destroy();
    res.status(200).json({ message: 'Property unliked successfully.' });
  } catch (error) {
    console.error('Error unliking property:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const getLikes = async (req, res) => {
  try {
    const userId = req.user.id; // Use req.user.id from authenticateUser middleware
    console.log('Fetching likes for user ID:', userId);

    // Fetch all likes for the user
    const likes = await Like.findAll({ where: { userId } });
    console.log('Likes fetched:', likes);

    res.status(200).json({ likes });
  } catch (error) {
    console.error('Error fetching likes:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = { likeProperty, unlikeProperty, getLikes };
