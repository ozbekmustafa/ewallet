const Account = require('../models/Account/model');
const { v4: uuidv4 } = require('uuid');

// Create a new account
exports.createAccount = async (req, res) => {
    try {
        const { userId, currency } = req.body;
        const accountNumber = uuidv4();

        const newAccount = new Account({
            user: userId,
            currency,
            balance: 0,
            accountNumber
        });
        await newAccount.save();
        res.status(201).json({ message: 'Account created successfully', account: newAccount });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get account details by ID
exports.getAccountById = async (req, res) => {
    try {
        const account = await Account.findById(req.params.id);
        if (!account) {
            return res.status(404).json({ message: 'Account not found' });
        }
        res.json(account);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update account information
exports.updateAccount = async (req, res) => {
    try {
        const { balance } = req.body;
        const account = await Account.findByIdAndUpdate(req.params.id, { balance }, { new: true });
        if (!account) {
            return res.status(404).json({ message: 'Account not found' });
        }
        res.json({ message: 'Account updated successfully', account });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete an account
exports.deleteAccount = async (req, res) => {
    try {
        const account = await Account.findByIdAndDelete(req.params.id);
        if (!account) {
            return res.status(404).json({ message: 'Account not found' });
        }
        res.json({ message: 'Account deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = exports;