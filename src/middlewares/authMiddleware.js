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

// Existing authenticateUser middleware remains unchanged
const authenticateUser = async (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(401).json({ message: 'Please login to continue' });
  }

  try {
    const decoded = jwt.verify(token.split(' ')[1], process.env.JWT_SECRET);
    const user = await User.findByPk(decoded.id);

    if (!user || user.isBlocked) {
      return res.status(403).json({ message: 'Your account is blocked. Please contact support.' });
    }

    req.userId = decoded.id;
    next();
  } catch (error) {
    console.error('Error verifying user token:', error);
    res.status(401).json({ message: 'Invalid or expired token' });
  }
};

module.exports = { authenticateUser, authenticateAdmin };
