const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionController');
const permission = require('../middleware/permission');

/**
 * @api {post} /transactions Create Transaction
 * @apiName CreateTransaction
 * @apiGroup Transaction
 * @apiVersion 1.0.0
 *
 * @apiParam {String} accountId ID of the account involved in the transaction.
 * @apiParam {String} type Type of the transaction (e.g., 'deposit', 'withdrawal').
 * @apiParam {Number} amount Amount of the transaction.
 *
 * @apiSuccess {String} message Success message.
 * @apiSuccess {Object} transaction Details of the created transaction.
 */
router.post('/transactions', transactionController.createTransaction);

/**
 * @api {get} /transactions/:id Get Transaction
 * @apiName GetTransaction
 * @apiGroup Transaction
 * @apiVersion 1.0.0
 *
 * @apiParam {String} id Unique ID of the transaction.
 *
 * @apiSuccess {Object} transaction Details of the transaction.
 */
router.get('/transactions/:id', transactionController.getTransactionById);

/**
 * @api {get} /accounts/:accountId/transactions List Transactions for Account
 * @apiName ListAccountTransactions
 * @apiGroup Transaction
 * @apiVersion 1.0.0
 *
 * @apiParam {String} accountId ID of the account to list transactions for.
 *
 * @apiSuccess {Array} transactions Array of transactions related to the account.
 */
router.get('/accounts/:accountId/transactions', transactionController.listTransactionsByAccount);

/**
 * @api {post} /transactions/approve-or-reject Approve or Reject transaction
 * @apiName ApproveOrRejectTransaction
 * @apiGroup Transaction
 * @apiVersion 1.0.0
 *
 * @apiParam (body) {String} transactionId The ID of the transaction to be processed.
 * @apiParam (body) {Boolean} approve Boolean indicating whether the transaction is to be approved (true) or rejected (false).
 *
 * @apiSuccess {String} message Success or rejection message.
 *
 * @apiError TransactionNotFound The specified transaction does not exist.
 * @apiError InvalidOperation The operation is not valid for the transaction type or status.
 * @apiError InsufficientFunds The account does not have enough funds to complete the transaction.
 */
router.post('/transactions/approve-or-reject', permission.isFinance, transactionController.approveOrRejectTransaction);

/**
 * @api {post} /transactions/cancel Cancel Transaction
 * @apiName CancelTransaction
 * @apiGroup Transaction
 * @apiVersion 1.0.0
 *
 * @apiParam (body) {String} transactionId The ID of the transaction to be cancelled.
 *
 * @apiSuccess {String} message Success message indicating the transaction has been cancelled.
 *
 * @apiError TransactionNotFound The specified transaction does not exist.
 * @apiError InvalidOperation The operation is not valid for the transaction's current status.
 */
router.post('/transactions/cancel', permission.isUser, transactionController.cancelTransaction);

/**
 * @api {post} /transactions/deposit-money-to-bank Deposit Money to Bank
 * @apiName DepositMoneyToBank
 * @apiGroup Transaction
 * @apiVersion 1.0.0
 *
 * @apiParam (body) {String} accountId ID of the user's account.
 * @apiParam (body) {String} bankAccountId ID of the bank account to deposit money into.
 * @apiParam (body) {Number} amount Amount of money to deposit.
 *
 * @apiSuccess {String} message Success message.
 * @apiSuccess {Object} transaction Details of the deposit transaction.
 *
 * @apiError UserAccountNotFound The user's account was not found.
 * @apiError BankAccountNotFound The bank account was not found.
 * @apiError InternalServerError Internal Server Error.
 */
router.post('/transactions/deposit-money-to-bank', transactionController.depositMoneyToBank);

module.exports = router;