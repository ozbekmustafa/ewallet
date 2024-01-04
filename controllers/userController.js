const User = require('../models/User/model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const redisClient = require('../libs/redis');

// Create a new user
exports.createUser = async (req, res) => {
    try {
        const { username, email, password, role, phoneNumber, identityNumber } = req.body;
        const accessToken = req.headers.authorization;
        if (!accessToken) {
            return res.status(403).json({ message: 'Access token is required' });
        }
        const userDataString = await redisClient.get(accessToken);
        if (!userDataString) {
            return res.status(403).json({ message: 'Invalid access token' });
        }
        const userData = JSON.parse(userDataString);
        if ((role === "support" || role === "finance") && userData.role !== 'admin') {
            return res.status(403).json({ message: 'Only admin can assign support or finance roles' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            role
        });
        if (phoneNumber)
            newUser.phoneNumber = phoneNumber;
        if (identityNumber)
            newUser.identityNumber = identityNumber;

        await newUser.save();
        res.status(201).json({ message: 'User created successfully', user: newUser });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get user by ID
exports.getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update user information
exports.updateUser = async (req, res) => {
    try {
        const updates = req.body;
        const user = await User.findByIdAndUpdate(req.params.id, updates, { new: true });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({ message: 'User updated successfully', user });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a user
exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//Login user
exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(401).json({ message: 'Authentication failed' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Authentication failed' });
        }

        const accessToken = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
        const userData = {
            accessToken,
            _id: user._id,
            username: user.username,
            email: user.email,
            role: user.role
        };
        await redisClient.set(accessToken, JSON.stringify(userData));

        res.json({ accessToken });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.verifyPhoneNumber = async (req, res) => {
    try {
        const { userId, phoneNumber } = req.body;
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (user.phoneNumber !== phoneNumber) {
            return res.status(400).json({ message: 'Phone number does not match our records' });
        }

        user.phoneVerified = true;
        await user.save();

        res.status(200).json({ message: 'Phone number verified successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.verifyIdentityNumber = async (req, res) => {
    try {
        const { userId, identityNumber } = req.body;
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (user.identityNumber !== identityNumber) {
            return res.status(400).json({ message: 'Identity number does not match our records' });
        }

        user.identityVerified = true;
        await user.save();

        res.status(200).json({ message: 'Identity number verified successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = exports;