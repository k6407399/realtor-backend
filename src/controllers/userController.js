const { User } = require('../../models');
const { Property } = require('../../models');
const jwt = require('jsonwebtoken');

const generateOtp = () => Math.floor(100000 + Math.random() * 900000).toString();

const signupUser = async (req, res) => {
  try {
    const { mobileNumber, name } = req.body;
    const otp = generateOtp();

    let user = await User.findOne({ where: { mobileNumber } });
    if (!user) {
      user = await User.create({ mobileNumber, name, otp });
    } else {
      user.otp = otp;
      await user.save();
    }

    console.log(`OTP sent to ${mobileNumber}: ${otp}`); // Simulate SMS API
    res.status(200).json({ message: 'OTP sent successfully' });
  } catch (error) {
    console.error('Error during signup:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const loginUser = async (req, res) => {
  try {
    const { mobileNumber, otp } = req.body;

    const user = await User.findOne({ where: { mobileNumber, otp } });
    if (!user) {
      return res.status(401).json({ message: 'Invalid OTP' });
    }

    user.otp = null;
    await user.save();

    const token = jwt.sign({ id: user.id, role: 'user' }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const getListings = async (req, res) => {
  try {
    const properties = await Property.findAll();
    res.status(200).json({ properties });
  } catch (error) {
    console.error('Error fetching properties:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = { signupUser, loginUser, getListings };
