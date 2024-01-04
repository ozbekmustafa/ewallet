const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const permission = require('../middleware/permission');

/**
 * @api {post} /users Create User
 * @apiName CreateUser
 * @apiGroup User
 * @apiVersion 1.0.0
 *
 * @apiParam (body) {String} username Username of the User.
 * @apiParam (body) {String} email Email of the User.
 * @apiParam (body) {String} password Password of the User.
 * @apiParam (body) {String} [role] Role of the User (optional).
 * @apiParam (body) {String} [phoneNumber] Phone number of the User (optional).
 * @apiParam (body) {String} [identityNumber] Identity number of the User (optional).
 *
 * @apiSuccess {String} message Success message.
 * @apiSuccess {Object} user Details of the created user.
 */
router.post('/users', userController.createUser);

/**
 * @api {get} /users/:id Get User
 * @apiName GetUser
 * @apiGroup User
 * @apiVersion 1.0.0
 *
 * @apiParam (path) {String} id Unique ID of the User.
 *
 * @apiSuccess {Object} user Details of the user.
 */
router.get('/users/:id', permission.isNotSupport, userController.getUserById);

/**
 * @api {put} /users/:id Update User
 * @apiName UpdateUser
 * @apiGroup User
 * @apiVersion 1.0.0
 *
 * @apiParam (path) {String} id Unique ID of the User.
 * @apiParam (body) {String} [username] New username of the User (optional).
 * @apiParam (body) {String} [email] New email of the User (optional).
 * @apiParam (body) {String} [password] New password of the User (optional).
 * @apiParam (body) {String} [role] New role of the User (optional).
 * @apiParam (body) {String} [phoneNumber] Phone number of the User (optional).
 * @apiParam (body) {String} [identityNumber] Identity number of the User (optional).
 *
 * @apiSuccess {String} message Success message.
 * @apiSuccess {Object} user Updated user details.
 */
router.put('/users/:id', permission.isAdmin, userController.updateUser);

/**
 * @api {delete} /users/:id Delete User
 * @apiName DeleteUser
 * @apiGroup User
 * @apiVersion 1.0.0
 *
 * @apiParam (path) {String} id Unique ID of the User.
 *
 * @apiSuccess {String} message Success message.
 */
router.delete('/users/:id', permission.isAdmin, userController.deleteUser);

/**
 * @api {post} /login Login User
 * @apiName login
 * @apiGroup User
 * @apiVersion 1.0.0
 *
 * @apiParam (body) {String} username Username of the User.
 * @apiParam (body) {String} password Password of the User.
 *
 * @apiSuccess {String} accessToken JWT access token generated for the User.
 *
 * @apiError UserNotFound Incorrect username or password.
 */
router.post('/login', userController.login);

/**
 * @api {post} /verify-phone Verify Phone Number
 * @apiName VerifyPhoneNumber
 * @apiGroup User
 * @apiVersion 1.0.0
 * 
 * @apiParam (body) {String} userId User's unique ID.
 * @apiParam (body) {String} phoneNumber User's phone number to be verified.
 *
 * @apiSuccess {String} message Success message.
 * @apiError UserNotFound User not found.
 * @apiError ValidationError Validation error message.
 */
router.post('/verify-phone', userController.verifyPhoneNumber);

/**
 * @api {post} /verify-identity Verify Identity Number
 * @apiName VerifyIdentityNumber
 * @apiGroup User
 * @apiVersion 1.0.0
 * 
 * @apiParam (body) {String} userId User's unique ID.
 * @apiParam (body) {String} identityNumber User's identity number to be verified.
 *
 * @apiSuccess {String} message Success message.
 * @apiError UserNotFound User not found.
 * @apiError ValidationError Validation error message.
 */
router.post('/verify-identity', userController.verifyIdentityNumber);


module.exports = router;
