const BankAccount = require('../models/BankAccount/model');

exports.addBankAccount = async (req, res) => {
    try {
        const { bankName, accountNumber, IBAN } = req.body;
        const newBankAccount = new BankAccount({
            bankName,
            accountNumber,
            IBAN
        });

        await newBankAccount.save();
        res.status(201).json({ message: 'Bank account added successfully', bankAccount: newBankAccount });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateBankAccount = async (req, res) => {
    try {
        const { bankName, accountNumber, IBAN } = req.body;
        const bankAccount = await BankAccount.findByIdAndUpdate(req.params.id, {
            bankName,
            accountNumber,
            IBAN
        }, { new: true });

        if (!bankAccount) {
            return res.status(404).json({ message: 'Bank account not found' });
        }

        res.json({ message: 'Bank account updated successfully', bankAccount });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deleteBankAccount = async (req, res) => {
    try {
        const bankAccount = await BankAccount.findByIdAndDelete(req.params.id);

        if (!bankAccount) {
            return res.status(404).json({ message: 'Bank account not found' });
        }

        res.json({ message: 'Bank account deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = exports;