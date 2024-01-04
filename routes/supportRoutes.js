const express = require('express');
const router = express.Router();
const supportController = require('../controllers/supportController');

/**
 * @api {post} /support-tickets Create Support Ticket
 * @apiName CreateSupportTicket
 * @apiGroup SupportTicket
 * @apiVersion 1.0.0
 *
 * @apiParam {String} userId ID of the User creating the ticket.
 * @apiParam {String} issueDescription Description of the issue.
 *
 * @apiSuccess {String} message Success message.
 * @apiSuccess {Object} ticket Details of the created support ticket.
 */
router.post('/support-tickets', supportController.createTicket);

/**
 * @api {get} /support-tickets/:id Get Support Ticket
 * @apiName GetSupportTicket
 * @apiGroup SupportTicket
 * @apiVersion 1.0.0
 *
 * @apiParam {String} id Unique ID of the Support Ticket.
 *
 * @apiSuccess {Object} ticket Details of the support ticket.
 */
router.get('/support-tickets/:id', supportController.getTicketById);

/**
 * @api {put} /support-tickets/:id Update Support Ticket
 * @apiName UpdateSupportTicket
 * @apiGroup SupportTicket
 * @apiVersion 1.0.0
 *
 * @apiParam {String} id Unique ID of the Support Ticket.
 * @apiParam {String} responseText Text of the response to be added to the ticket.
 * @apiParam {String} responderId ID of the user responding to the ticket.
 *
 * @apiSuccess {String} message Success message.
 * @apiSuccess {Object} ticket Details of the updated support ticket.
 */
router.put('/support-tickets/:id', supportController.updateTicket);

/**
 * @api {get} /users/:userId/support-tickets List Support Tickets for a User
 * @apiName ListUserSupportTickets
 * @apiGroup SupportTicket
 * @apiVersion 1.0.0
 *
 * @apiParam {String} userId Unique ID of the User.
 *
 * @apiSuccess {Array} tickets Array of support tickets for the user.
 */
router.get('/users/:userId/support-tickets', supportController.listUserTickets);

module.exports = router;
