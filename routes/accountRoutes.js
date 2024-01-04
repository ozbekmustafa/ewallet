const express = require('express');
const router = express.Router();
const accountController = require('../controllers/accountController');

/**
 * @api {post} /accounts Create Account
 * @apiName CreateAccount
 * @apiGroup Account
 * @apiVersion 1.0.0
 *
 * @apiParam {String} userId ID of the User owning the account.
 * @apiParam {String} currency Currency of the account.
 *
 * @apiSuccess {String} message Success message.
 * @apiSuccess {Object} account Account details.
 */
router.post('/accounts', accountController.createAccount);

/**
 * @api {get} /accounts/:id Get Account
 * @apiName GetAccount
 * @apiGroup Account
 * @apiVersion 1.0.0
 *
 * @apiParam {String} id Unique ID of the Account.
 *
 * @apiSuccess {Object} account Account details.
 */
router.get('/accounts/:id', accountController.getAccountById);

/**
 * @api {put} /accounts/:id Update Account
 * @apiName UpdateAccount
 * @apiGroup Account
 * @apiVersion 1.0.0
 *
 * @apiParam {String} id Unique ID of the Account.
 * @apiParam {Number} [balance] New balance of the Account (optional).
 *
 * @apiSuccess {String} message Success message.
 * @apiSuccess {Object} account Updated Account details.
 */
router.put('/accounts/:id', accountController.updateAccount);

/**
 * @api {delete} /accounts/:id Delete Account
 * @apiName DeleteAccount
 * @apiGroup Account
 * @apiVersion 1.0.0
 *
 * @apiParam {String} id Unique ID of the Account.
 *
 * @apiSuccess {String} message Success message.
 */
router.delete('/accounts/:id', accountController.deleteAccount);

module.exports = router;