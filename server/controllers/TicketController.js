"use strict";

const validation = require("../middleware/validation.js");

const Ticket = require("../models/TicketModel.js");

const { TICKET_SCHEMA_VERSION } = process.env;

// Create a ticket
// POST /api/tickets/create - CREATE A TICKET
const createTicket = (async (req, res) => {
    try {
        const {
            subject,
            userId,
            hasDeadline,
            deadline,
            relatedTo,
            userFirstName,
            userLastName,
            description
        } = req.body;
    
        const submittedOn = new Date();

        const inputArr = [ subject, userId, relatedTo, userFirstName, userLastName, description];

        if(!(validation.hasValues(inputArr))) {
            return res.status(400).send(`400 - BAD REQUEST. All input is required. ${subject} ${userId} ${relatedTo} ${userFirstName} ${userLastName} ${description}`);
        }

        if(!(validation.isValidObjectId(userId) && validation.isValidObjectId(relatedTo))) {
            return res.status(400).send("400 - BAD REQUEST. Invalid id.");
        }

        if(!(validation.allStrings([subject, userFirstName, userLastName, description]))) {
            return res.status(400).send("400 - BAD REQUEST. Input must be of type string.");
        }

        // Create the ticket in the database
        const ticket = await Ticket.create({
            schemaVersion: TICKET_SCHEMA_VERSION,
            subject: subject,
            submittedBy: userId,
            hasDeadline: hasDeadline,
            deadline: deadline,
            relatedTo: relatedTo,
            description: {
                timeStamp: submittedOn,
                submitterId: userId,
                submitterFirstName: userFirstName,
                submitterLastName: userLastName,
                body: description
            }
        });

        // Return new ticket
        res.status(201).json(ticket);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Retrieve all tickets
// GET /api/tickets/getAll - GET ALL TICKETS
const getAllTickets = (async (req, res) => {
    try {
        const tickets = await Ticket.find();

        res.status(200).json(tickets);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Retrieve one ticket
// GET /api/tickets/getOne/:id - GET ONE TICKET
const getOneTicket = (async (req, res) => {
    try {
        if(!(validation.isValidObjectId(req.params.id))) {
            return res.status(400).send("400 - BAD REQUEST. Invalid id.");
        }

        const ticket = await Ticket.findById(req.params.id);

        res.status(200).json(ticket);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Update one ticket
// PATCH /api/tickets/updateOne/:id - UPDATE ONE PROJECT
const updateOneTicket = (async (req, res) => {
    try {
      const ticketId = req.params.id;
      const updatedData = req.body;
      const options = { new: true };
  
      const ticket = await Ticket.findByIdAndUpdate(
        ticketId, updatedData, options
      );
  
      res.status(200).send(ticket);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
});

// Add user to ticket
// PUT /api/tickets/addUser/:id - ADD A USER TO TICKET
const addUser = (async (req, res) => {
    try {
        const {
            userId,
            userFirstName,
            userLastName,
        } = req.body;

        const inputArr = [
            req.params.id,
            userId,
            userFirstName,
            userLastName,
        ];

        const checkStrArr = [
            userFirstName,
            userLastName,
        ];

        if(!(validation.hasValues(inputArr))) {
            return res.status(400).send("400 - BAD REQUEST. All input is required.");
        }

        if(!(validation.isValidObjectId(req.params.id) 
        && validation.isValidObjectId(userId))) {
            return res.status(400).send("400 - BAD REQUEST. Invalid id.");
        }
        
        if(!(validation.allStrings(checkStrArr))) {
            return res.status(400).send("400 - BAD REQUEST. Input must be of type string.");
        }

        const user = {
            userId: userId,
            firstName: userFirstName,
            lastName: userLastName,
        };

        const ticket = await Ticket.findOneAndUpdate(
            { _id: req.params.id, },
            { 
                $push: { assignedUsers: user, },
                $inc: { userCount: 1 }, 
            },
            { new: true }
        );

        res.status(200).json(ticket);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Remove user from ticket
// PUT /api/tickets/removeUser/:id - REMOVE A MEMBER FROM TICKET
const removeUser = (async (req, res) => {
    try {
        const {
            userId,
            userFirstName,
            userLastName,
        } = req.body;

        const inputArr = [
            req.params.id,
            userId,
            userFirstName,
            userLastName,
        ];

        const checkStrArr = [
            userFirstName,
            userLastName,
        ];

        if(!(validation.hasValues(inputArr))) {
            return res.status(400).send("400 - BAD REQUEST. All input is required.");
        }

        if(!(validation.isValidObjectId(req.params.id) 
        && validation.isValidObjectId(userId))) {
            return res.status(400).send("400 - BAD REQUEST. Invalid id.");
        }
        
        if(!(validation.allStrings(checkStrArr))) {
            return res.status(400).send("400 - BAD REQUEST. Input must be of type string.");
        }

        const user = {
            userId: userId,
            firstName: userFirstName,
            lastName: userLastName,
        };

        const ticket = await Ticket.findOneAndUpdate(
            { _id: req.params.id, },
            { 
                $pull: { assignedUsers: user, },
                $inc: { userCount: -1 }, 
            },
            { new: true }
        );

        res.status(200).json(ticket);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Add team to ticket
// PUT /api/tickets/addTeam/:id - ADD A TEAM TO TICKET
const addTeam = (async (req, res) => {
    try {
        const {
            teamId,
            teamName
        } = req.body;

        const inputArr = [
            req.params.id,
            teamId,
            teamName
        ];

        const checkStrArr = [
            teamName
        ];

        if(!(validation.hasValues(inputArr))) {
            return res.status(400).send("400 - BAD REQUEST. All input is required.");
        }

        if(!(validation.isValidObjectId(req.params.id) 
        && validation.isValidObjectId(teamId))) {
            return res.status(400).send("400 - BAD REQUEST. Invalid id.");
        }
        
        if(!(validation.allStrings(checkStrArr))) {
            return res.status(400).send("400 - BAD REQUEST. Input must be of type string.");
        }

        const team = {
            teamId: teamId,
            teamName: teamName,
        };

        const ticket = await Ticket.findOneAndUpdate(
            { _id: req.params.id, },
            { 
                $push: { assignedTeams: team, },
                $inc: { teamCount: 1 }, 
            },
            { new: true }
        );

        res.status(200).json(ticket);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Remove team from ticket
// PUT /api/tickets/removeTeam/:id - REMOVE A TEAM FROM TICKET
const removeTeam = (async (req, res) => {
    try {
        const {
            teamId,
            teamName
        } = req.body;

        const inputArr = [
            req.params.id,
            teamId,
            teamName
        ];

        const checkStrArr = [
            teamName
        ];

        if(!(validation.hasValues(inputArr))) {
            return res.status(400).send("400 - BAD REQUEST. All input is required.");
        }

        if(!(validation.isValidObjectId(req.params.id) 
        && validation.isValidObjectId(teamId))) {
            return res.status(400).send("400 - BAD REQUEST. Invalid id.");
        }
        
        if(!(validation.allStrings(checkStrArr))) {
            return res.status(400).send("400 - BAD REQUEST. Input must be of type string.");
        }

        const team = {
            teamId: teamId,
            teamName: teamName,
        };

        const ticket = await Ticket.findOneAndUpdate(
            { _id: req.params.id, },
            { 
                $pull: { assignedTeams: team, },
                $inc: { teamCount: -1 }, 
            },
            { new: true }
        );

        res.status(200).json(ticket);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Add department to ticket
// PUT /api/tickets/addDepartment/:id - ADD A DEPARTMENT TO TICKET
const addDepartment = (async (req, res) => {
    try {
        const {
            departmentId,
            departmentName
        } = req.body;

        const inputArr = [
            req.params.id,
            departmentId,
            departmentName
        ];

        const checkStrArr = [
            departmentName
        ];

        if(!(validation.hasValues(inputArr))) {
            return res.status(400).send(`400 - BAD REQUEST. All input is required. ${req.params.id} ${departmentId} ${departmentName}`);
        }

        if(!(validation.isValidObjectId(req.params.id) 
        && validation.isValidObjectId(departmentId))) {
            return res.status(400).send("400 - BAD REQUEST. Invalid id.");
        }
        
        if(!(validation.allStrings(checkStrArr))) {
            return res.status(400).send("400 - BAD REQUEST. Input must be of type string.");
        }

        const department = {
            departmentId: departmentId,
            departmentName: departmentName,
        };

        const ticket = await Ticket.findOneAndUpdate(
            { _id: req.params.id, },
            { 
                $push: { assignedDepartments: department, },
                $inc: { departmentCount: 1 }, 
            },
            { new: true }
        );

        res.status(200).json(ticket);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Remove department from ticket
// PUT /api/tickets/removeDepartment/:id - REMOVE A DEPARTMENT FROM TICKET
const removeDepartment = (async (req, res) => {
    try {
        const {
            departmentId,
            departmentName
        } = req.body;

        const inputArr = [
            req.params.id,
            departmentId,
            departmentName
        ];

        const checkStrArr = [
            departmentName
        ];

        if(!(validation.hasValues(inputArr))) {
            return res.status(400).send("400 - BAD REQUEST. All input is required.");
        }

        if(!(validation.isValidObjectId(req.params.id) 
        && validation.isValidObjectId(departmentId))) {
            return res.status(400).send("400 - BAD REQUEST. Invalid id.");
        }
        
        if(!(validation.allStrings(checkStrArr))) {
            return res.status(400).send("400 - BAD REQUEST. Input must be of type string.");
        }

        const department = {
            departmentId: departmentId,
            departmentName: departmentName,
        };

        const ticket = await Ticket.findOneAndUpdate(
            { _id: req.params.id, },
            { 
                $pull: { assignedDepartments: department, },
                $inc: { departmentCount: -1 }, 
            },
            { new: true }
        );

        res.status(200).json(ticket);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete one ticket
// DELETE /api/tickets/deleteOne/:id - DELETE ONE TICKET
const deleteOneTicket = (async (req, res) => {
    try {
      const ticketId = req.params.id;
      const ticketData = await Ticket.findByIdAndDelete(ticketId);
      res.status(204).send(`Document with title ${ticketData.title} has been deleted.`);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
});

module.exports = {
    createTicket,
    getAllTickets,
    getOneTicket,
    updateOneTicket,
    addUser,
    removeUser,
    addTeam,
    removeTeam,
    addDepartment,
    removeDepartment,
    deleteOneTicket
}