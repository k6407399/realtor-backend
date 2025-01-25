const jwt = require('jsonwebtoken');
const { User, Admin } = require('../../models');

// Middleware to authenticate admin
const authenticateAdmin = async (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(401).json({ message: 'Authorization token is required' });
  }

  try {
    const decoded = jwt.verify(token.split(' ')[1], process.env.JWT_SECRET);

    // Check if the role is 'admin'
    if (decoded.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
    }

    const admin = await Admin.findByPk(decoded.id);
    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }

    req.adminId = decoded.id;
    next();
  } catch (error) {
    console.error('Error verifying admin token:', error);
    res.status(401).json({ message: 'Invalid or expired token' });
  }
};

/* const authenticateUser = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Authorization token is required' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('[AuthMiddleware] Decoded Token:', decoded); // Log decoded token
    req.userId = decoded.id; // Attach userId to the request
    next();
  } catch (error) {
    console.error('Invalid token:', error);
    res.status(401).json({ message: 'Invalid or expired token' });
  }
}; */

/* const authenticateUser = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Access token missing or invalid' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findByPk(decoded.id);

    if (!user) {
      return res.status(401).json({ message: 'User not found or token invalid' });
    }

    req.user = user; // Attach user info to request
    next();
  } catch (error) {
    console.error('Error verifying user token:', error);
    res.status(401).json({ message: 'Invalid or expired token' });
  }
}; */

const authenticateUser = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      console.log('Token missing or invalid format.');
      return res.status(401).json({ message: 'Access token missing or invalid' });
    }

    console.log('Token received:', token);

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Decoded Token:', decoded);

    const user = await User.findByPk(decoded.id);
    if (!user) {
      console.log('User not found for token ID:', decoded.id);
      return res.status(401).json({ message: 'User not found or token invalid' });
    }

    console.log('User authenticated:', user.id);
    req.user = user; // Attach user info to request
    next();
  } catch (error) {
    console.error('Error verifying user token:', error);
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};

module.exports = { authenticateUser, authenticateAdmin };
