const twilio = require("twilio");
const jwt = require("jsonwebtoken");
const { User } = require("../../models");

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

// Send OTP using Twilio Verify
const sendOtp = async (req, res) => {
  const { mobileNumber, isSignup } = req.body;
  console.debug("[sendOtp] Received request to send OTP for mobileNumber:", mobileNumber, "isSignup:", isSignup);

  try {
    // Check if the user exists
    const user = await User.findOne({ where: { mobileNumber } });

    if (isSignup && user) {
      // If it's a signup attempt and the user exists
      console.debug("[sendOtp] User already registered:", mobileNumber);
      return res.status(400).json({
        message: "This mobile number is already registered. Please login instead.",
      });
    } else if (!isSignup && !user) {
      // If it's a login attempt and the user does not exist
      console.debug("[sendOtp] User not found for login attempt:", mobileNumber);
      return res.status(400).json({
        message: "This mobile number is not registered. Please sign up first.",
      });
    }

    // Send OTP using Twilio
    console.debug("[sendOtp] Sending OTP via Twilio for mobileNumber:", mobileNumber);
    const verification = await client.verify.v2
      .services(process.env.TWILIO_VERIFY_SERVICE_SID)
      .verifications.create({
        to: mobileNumber,
        channel: "sms",
      });

    console.debug("[sendOtp] OTP sent successfully. Verification status:", verification.status);
    res.status(200).json({ message: "OTP sent successfully.", status: verification.status });
  } catch (error) {
    console.error("[sendOtp] Error sending OTP for mobileNumber:", mobileNumber, error);
    res.status(500).json({ message: "Failed to send OTP. Try again later." });
  }
};

// Verigy OTP using Twilio Verify
const verifyOtp = async (req, res) => {
  const { mobileNumber, code, name } = req.body;
  console.debug("[verifyOtp] Verifying OTP for mobileNumber:", mobileNumber);

  try {
    const verificationCheck = await client.verify.v2
      .services(process.env.TWILIO_VERIFY_SERVICE_SID)
      .verificationChecks.create({ to: mobileNumber, code });

    if (verificationCheck.status !== "approved") {
      console.warn("[verifyOtp] Invalid OTP for mobileNumber:", mobileNumber);
      return res.status(401).json({ message: "Invalid OTP." });
    }

    let user = await User.findOne({ where: { mobileNumber } });
    if (user) {
      if (!user.name && name) {
        user.name = name;
        await user.save();
        console.debug("[verifyOtp] Updated name for existing user:", mobileNumber);
      }
    } else {
      user = await User.create({ mobileNumber, name });
      console.debug("[verifyOtp] Created new user with mobileNumber:", mobileNumber);
    }

    const token = jwt.sign({ id: user.id, role: "user" }, process.env.JWT_SECRET, { expiresIn: "7d" });
    console.debug("[verifyOtp] User authenticated successfully:", mobileNumber);
    res.status(200).json({ token, message: user.name ? `Welcome back, ${user.name}!` : "User authenticated successfully." });
  } catch (error) {
    console.error("[verifyOtp] Error verifying OTP for mobileNumber:", mobileNumber, error);
    res.status(500).json({ message: "Failed to verify OTP. Try again later." });
  }
};

// Fetch all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: ['id', 'name', 'mobileNumber', 'isBlocked'], // Include only required fields
    });
    res.status(200).json({ users });
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Failed to fetch users' });
  }
};

// Fetch User Profile
const getUserProfile = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: ['id', 'name', 'mobileNumber' ],
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Update User Profile
const updateUserProfile = async (req, res) => {
  try {
    const { name, email, mobileNumber } = req.body;

    const user = await User.findByPk(req.user.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update profile fields
    user.name = name || user.name;
    user.email = email || user.email;
    user.mobileNumber = mobileNumber || user.mobileNumber;

    await user.save();

    res.status(200).json({
      message: 'Profile updated successfully',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        mobileNumber: user.mobileNumber,
      },
    });
  } catch (error) {
    console.error('Error updating user profile:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = { sendOtp, verifyOtp, getAllUsers, getUserProfile, updateUserProfile };
