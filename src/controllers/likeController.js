const { Like } = require('../../models');

const likeProperty = async (req, res) => {
  try {
    const { propertyId, propertyType } = req.body;
    const userId = req.userId;

    // Check if the property is already liked by the user
    const existingLike = await Like.findOne({ where: { userId, propertyId, propertyType } });
    if (existingLike) {
      return res.status(400).json({ message: 'Property already liked' });
    }

    const like = await Like.create({ userId, propertyId, propertyType });
    res.status(201).json({ message: 'Property liked successfully', like });
  } catch (error) {
    console.error('Error liking property:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const unlikeProperty = async (req, res) => {
  try {
    const { id } = req.params; // Like ID
    const userId = req.userId;

    // Find the like record
    const like = await Like.findOne({ where: { id, userId } });
    if (!like) {
      return res.status(404).json({ message: 'Like not found' });
    }

    await like.destroy();
    res.status(200).json({ message: 'Property unliked successfully' });
  } catch (error) {
    console.error('Error unliking property:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const getLikes = async (req, res) => {
  try {
    const userId = req.userId;

    const likes = await Like.findAll({ where: { userId } });
    res.status(200).json({ likes });
  } catch (error) {
    console.error('Error fetching liked properties:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = { likeProperty, unlikeProperty, getLikes };
