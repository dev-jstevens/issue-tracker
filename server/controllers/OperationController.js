"use strict";

const validation = require("../middleware/validation.js");

const Operation = require("../models/OperationModel.js");

const { OPERATION_SCHEMA_VERSION } = process.env;

// Create an operation
// POST /api/operations/create - CREATE AN OPERATION
const createOperation = (async (req, res) => {
    try {
        const {
            title,
            userId,
        } = req.body;
    

        const inputArr = [ title, userId];

        if(!(validation.hasValues(inputArr))) {
            return res.status(400).send(`400 - BAD REQUEST. All input is required. ${title} ${userId} ${startDate} ${endDate}`);
        }

        if(!(validation.isValidObjectId(userId))) {
            return res.status(400).send("400 - BAD REQUEST. Invalid id.");
        }

        if(!(validation.allStrings([title]))) {
            return res.status(400).send("400 - BAD REQUEST. Input must be of type string.");
        }

        // Create the operation in the database
        const operation = await Operation.create({
            schemaVersion: OPERATION_SCHEMA_VERSION,
            title: title,
            responsible: userId,
        });

        // Return new operation
        res.status(201).json(operation);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Retrieve all operations
// GET /api/operations/getAll - GET ALL OPERATIONS
const getAllOperations = (async (req, res) => {
    try {
        const operations = await Operation.find();

        res.status(200).json(operations);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Retrieve one operation
// GET /api/operations/getOne/:id - GET ONE OPERATION
const getOneOperation = (async (req, res) => {
    try {
        if(!(validation.isValidObjectId(req.params.id))) {
            return res.status(400).send("400 - BAD REQUEST. Invalid id.");
        }

        const operation = await Operation.findById(req.params.id);

        res.status(200).json(operation);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Update one operation
// PATCH /api/operations/updateOne/:id - UPDATE ONE OPERATION
const updateOneOperation = (async (req, res) => {
    try {
      const operationId = req.params.id;
      const updatedData = req.body;
      const options = { new: true };
  
      const operation = await Operation.findByIdAndUpdate(
        operationId, updatedData, options
      );
  
      res.status(200).send(operation);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
});

// Add team to operation
// PUT /api/operations/addTeam/:id - ADD A TEAM TO OPERATION
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

        const operation = await Operation.findOneAndUpdate(
            { _id: req.params.id, },
            { 
                $push: { teams: team, },
                $inc: { teamCount: 1 }, 
            },
            { new: true }
        );

        res.status(200).json(operation);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Remove team from operation
// PUT /api/operations/removeTeam/:id - REMOVE A TEAM FROM OPERATION
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

        const operation = await Operation.findOneAndUpdate(
            { _id: req.params.id, },
            { 
                $pull: { teams: team, },
                $inc: { teamCount: -1 }, 
            },
            { new: true }
        );

        res.status(200).json(operation);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Add department to operation
// PUT /api/operations/addDepartment/:id - ADD A DEPARTMENT TO OPERATION
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

        const operation = await Operation.findOneAndUpdate(
            { _id: req.params.id, },
            { 
                $push: { departments: department, },
                $inc: { departmentCount: 1 }, 
            },
            { new: true }
        );

        res.status(200).json(operation);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Remove department from operation
// PUT /api/operations/removeDepartment/:id - REMOVE A DEPARTMENT FROM OPERATION
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

        const operation = await Operation.findOneAndUpdate(
            { _id: req.params.id, },
            { 
                $pull: { departments: department, },
                $inc: { departmentCount: -1 }, 
            },
            { new: true }
        );

        res.status(200).json(operation);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete one operation
// DELETE /api/operations/deleteOne/:id - DELETE ONE OPERATION
const deleteOneOperation = (async (req, res) => {
    try {
      const operationId = req.params.id;
      const operationData = await Operation.findByIdAndDelete(operationId);
      res.status(204).send(`Document with title ${operationData.title} has been deleted.`);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
});

module.exports = {
    createOperation,
    getAllOperations,
    getOneOperation,
    updateOneOperation,
    addTeam,
    removeTeam,
    addDepartment,
    removeDepartment,
    deleteOneOperation
}