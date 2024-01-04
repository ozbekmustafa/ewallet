const Transaction = require('../models/Transaction/model');
const Account = require('../models/Account/model');
const BankAccount = require('../models/BankAccount/model');

// Record a new transaction
exports.createTransaction = async (req, res) => {
    try {
        const { accountId, type, amount } = req.body;

        const account = await Account.findById(accountId);
        if (!account) {
            return res.status(404).json({ message: 'Account not found' });
        }
        if (type === "withdrawal" && (!account.user.phoneVerified || !account.user.identityVerified)) {
            return res.status(403).json({ message: 'Phone and identity verification required' });
        }

        const newTransaction = new Transaction({
            account: accountId,
            type,
            amount
        });
        await newTransaction.save();

        res.status(201).json({ message: 'Transaction successful', transaction: newTransaction });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get transaction by ID
exports.getTransactionById = async (req, res) => {
    try {
        const transaction = await Transaction.findById(req.params.id);
        if (!transaction) {
            return res.status(404).json({ message: 'Transaction not found' });
        }
        res.json(transaction);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// List all transactions for an account
exports.listTransactionsByAccount = async (req, res) => {
    try {
        const accountId = req.params.accountId;
        const transactions = await Transaction.find({ account: accountId });
        res.json(transactions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.approveOrRejectTransaction = async (req, res) => {
    try {
        const { transactionId, approve } = req.body;

        const transaction = await Transaction.findById(transactionId);
        if (!transaction) {
            return res.status(404).json({ message: 'Transaction not found' });
        }

        if (transaction.status === 'completed' || transaction.status === 'rejected') {
            return res.status(400).json({ message: 'Transaction is already processed' });
        }

        const account = await Account.findById(transaction.account);
        if (!account) {
            return res.status(404).json({ message: 'Account not found' });
        }

        if (approve) {
            if (transaction.type === 'withdrawal') {
                if (account.balance < transaction.amount) {
                    return res.status(400).json({ message: 'Insufficient funds' });
                }
                account.balance -= transaction.amount;
            } else if (transaction.type === 'deposit') {
                account.balance += transaction.amount;
            }
            transaction.status = 'completed';
        } else {
            transaction.status = 'rejected';
        }

        await account.save();
        await transaction.save();
        res.status(200).json({ message: `Transaction ${approve ? 'approved' : 'rejected'}` });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.cancelTransaction = async (req, res) => {
    try {
        const { transactionId } = req.body;

        const transaction = await Transaction.findById(transactionId);
        if (!transaction) {
            return res.status(404).json({ message: 'Transaction not found' });
        }

        if (transaction.status !== 'pending') {
            return res.status(400).json({ message: 'Only pending transactions can be cancelled' });
        }

        transaction.status = 'cancelled';
        await transaction.save();

        res.status(200).json({ message: 'Transaction cancelled successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.depositMoneyToBank = async (req, res) => {
    try {
        const { accountId, bankAccountId, amount } = req.body;

        const account = await Account.findById(accountId);
        if (!account) {
            return res.status(404).json({ message: 'User account not found' });
        }

        const bankAccount = await BankAccount.findById(bankAccountId);
        if (!bankAccount) {
            return res.status(404).json({ message: 'Bank account not found' });
        }

        const newTransaction = new Transaction({
            account: accountId,
            type: 'deposit',
            amount: amount,
            bankAccount: bankAccountId
        });
        await newTransaction.save();

        account.balance += amount;
        await account.save();

        res.status(201).json({ message: 'Deposit successful', transaction: newTransaction });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = exports;
