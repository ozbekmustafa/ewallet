const express = require('express');
const router = express.Router();
const bankAccountController = require('../controllers/bankAccountController');
const permission = require('../middleware/permission');

/**
 * @api {post} /bank-accounts Add Bank Account
 * @apiName AddBankAccount
 * @apiGroup BankAccount
 * @apiVersion 1.0.0
 *
 * @apiParam (body) {String} bankName Name of the bank.
 * @apiParam (body) {String} accountNumber Bank account number.
 * @apiParam (body) {String} IBAN International Bank Account Number.
 *
 * @apiSuccess {String} message Success message.
 * @apiSuccess {Object} bankAccount Details of the created bank account.
 */
router.post('/bank-accounts', permission.isFinance, bankAccountController.addBankAccount);

/**
 * @api {put} /bank-accounts/:id Update Bank Account
 * @apiName UpdateBankAccount
 * @apiGroup BankAccount
 * @apiVersion 1.0.0
 *
 * @apiParam (path) {String} id Unique ID of the Bank Account.
 * @apiParam (body) {String} [bankName] Name of the bank.
 * @apiParam (body) {String} [accountNumber] Bank account number.
 * @apiParam (body) {String} [IBAN] International Bank Account Number.
 *
 * @apiSuccess {String} message Success message.
 * @apiSuccess {Object} bankAccount Details of the updated bank account.
 */
router.put('/bank-accounts/:id', permission.isFinance, bankAccountController.updateBankAccount);

/**
 * @api {delete} /bank-accounts/:id Delete Bank Account
 * @apiName DeleteBankAccount
 * @apiGroup BankAccount
 * @apiVersion 1.0.0
 *
 * @apiParam (path) {String} id Unique ID of the Bank Account.
 *
 * @apiSuccess {String} message Success message.
 */
router.delete('/bank-accounts/:id', permission.isFinance, bankAccountController.deleteBankAccount);

module.exports = router;
