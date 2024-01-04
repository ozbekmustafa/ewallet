const SupportModel = require('../models/Support/model');

// Create a new support ticket
exports.createTicket = async (req, res) => {
    try {
        const { userId, issueDescription } = req.body;
        const newTicket = new SupportModel({
            user: userId,
            issueDescription: issueDescription
        });
        await newTicket.save();
        res.status(201).json(newTicket);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get a specific ticket by ID
exports.getTicketById = async (req, res) => {
    try {
        const ticket = await SupportModel.findById(req.params.id);
        if (!ticket) {
            return res.status(404).json({ message: 'Ticket not found' });
        }
        res.json(ticket);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a support ticket
exports.updateTicket = async (req, res) => {
    try {
        const { responseText, responderId } = req.body;
        const ticket = await SupportModel.findById(req.params.id);
        if (!ticket) {
            return res.status(404).json({ message: 'Ticket not found' });
        }
        ticket.responses.push({ responseText, respondedBy: responderId });
        ticket.lastUpdatedDate = new Date();
        await ticket.save();
        res.json(ticket);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// List all tickets for a user
exports.listUserTickets = async (req, res) => {
    try {
        const userId = req.params.userId;
        const tickets = await SupportModel.find({ user: userId });
        res.json(tickets);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = exports;
