"use strict";

const validation = require("../middleware/validation.js");

const Department = require("../models/DepartmentModel.js");

const { DEPARTMENT_SCHEMA_VERSION } = process.env;

// Create a department
// POST /api/departments/create - CREATE A DEPARTMENT
const createDepartment = (async (req, res) => {
    try {
        const {
            title,
            organizationId,
            departmentHead,
            userFirstName,
            userLastName
        } = req.body;
    
        const inputArr = [ title, organizationId, departmentHead, userFirstName, userLastName ];
    
        if(!(validation.hasValues(inputArr))) {
            return res.status(400).send("400 - BAD REQUEST. All input is required.");
        }

        if(!(validation.isValidObjectId(organizationId) 
        && validation.isValidObjectId(departmentHead))) {
            return res.status(400).send("400 - BAD REQUEST. Invalid id.");
        }

        if(!(validation.allStrings([title, userFirstName, userLastName]))) {
            return res.status(400).send("400 - BAD REQUEST. Input must be of type string.");
        }

        const member = {
            userId: departmentHead,
            firstName: userFirstName,
            lastName: userLastName
        };

        // Create the department in the database
        const department = await Department.create({
            schemaVersion: DEPARTMENT_SCHEMA_VERSION,
            title: title,
            organizationId: organizationId,
            departmentHead: departmentHead,
            memberCount: 1,
            members: member
        });

        // Return new department
        res.status(201).json(department);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Retrieve all departments
// GET /api/departments/getAll - GET ALL DEPARTMENTS
const getAllDepartments = (async (req, res) => {
    try {
        const departments = await Department.find();

        res.status(200).json(departments);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Retrieve one department
// GET /api/departments/getOne/:id - GET ONE DEPARTMENT
const getOneDepartment = (async (req, res) => {
    try {
        if(!(validation.isValidObjectId(req.params.id))) {
            return res.status(400).send("400 - BAD REQUEST. Invalid id.");
        }

        const department = await Department.findById(req.params.id);

        res.status(200).json(department);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Update one department
// PATCH /api/departments/updateOne/:id - UPDATE ONE DEPARTMENT
const updateOneDepartment = (async (req, res) => {
    try {
      const departmentId = req.params.id;
      const updatedData = req.body;
      const options = { new: true };
  
      const department = await Department.findByIdAndUpdate(
        departmentId, updatedData, options
      );
  
      res.status(200).send(department);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
});

// Add member to department
// PUT /api/departments/addMember/:id - ADD A MEMBER TO DEPARTMENT
const addMember = (async (req, res) => {
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

        const member = {
            userId: userId,
            firstName: userFirstName,
            lastName: userLastName,
        };

        const department = await Department.findOneAndUpdate(
            { _id: req.params.id, },
            { 
                $push: { members: member, },
                $inc: { memberCount: 1 }, 
            },
            { new: true }
        );

        res.status(200).json(department);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Remove member from department
// PUT /api/departments/removeMember/:id - REMOVE A MEMBER FROM DEPARTMENT
const removeMember = (async (req, res) => {
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

        const member = {
            userId: userId,
            firstName: userFirstName,
            lastName: userLastName,
        };

        const department = await Department.findOneAndUpdate(
            { _id: req.params.id, },
            { 
                $pull: { members: member, },
                $inc: { memberCount: -1 }, 
            },
            { new: true }
        );

        res.status(200).json(department);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete one departments
// DELETE /api/departments/deleteOne/:id - DELETE ONE DEPARTMENT
const deleteOneDepartment = (async (req, res) => {
    try {
      const departmentId = req.params.id;
      const departmentData = await Department.findByIdAndDelete(departmentId);
      res.status(204).send(`Document with id ${departmentId} has been deleted.`);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
});

module.exports = {
    createDepartment,
    getAllDepartments,
    getOneDepartment,
    updateOneDepartment,
    addMember,
    removeMember,
    deleteOneDepartment
}