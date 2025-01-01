const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { Admin, User } = require('../../models');

const adminLogin = async (req, res) => {
  try {
    console.log('Request received:', req.body); // Log the incoming request

    const { username, password } = req.body;
    const admin = await Admin.findOne({ where: { username } });
    console.log('Admin found:', admin); // Check if the query returns a result

    if (!admin) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    const isPasswordValid = await bcrypt.compare(password, admin.password);
    console.log('Password valid:', isPasswordValid); // Log the password comparison

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    // Generate token or handle successful login
    res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    console.error('Error during admin login:', error); // Log the error
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Fetch blocklist
const fetchBlocklist = async (req, res) => {
  try {
    const blockedUsers = await User.findAll({ where: { isBlocked: true } });
    res.status(200).json({ blocklist: blockedUsers });
  } catch (error) {
    console.error('Error fetching blocklist:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Toggle block/unblock a user
const toggleBlockUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { isBlocked } = req.body;

    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.isBlocked = isBlocked;
    await user.save();

    res.status(200).json({
      message: `User has been ${isBlocked ? 'blocked' : 'unblocked'} successfully`,
      user: { id: user.id, isBlocked: user.isBlocked },
    });
  } catch (error) {
    console.error('Error toggling block status:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = { adminLogin, fetchBlocklist, toggleBlockUser };