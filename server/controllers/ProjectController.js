"use strict";

const validation = require("../middleware/validation.js");

const Project = require("../models/ProjectModel.js");

const { PROJECT_SCHEMA_VERSION } = process.env;

// Create a project
// POST /api/projects/create - CREATE A PROJECT
const createProject = (async (req, res) => {
    try {
        const {
            title,
            userId,
            startDate,
            endDate,
        } = req.body;
    
        // const start = new Date(JSON.parse(startDate));
        // const end = new Date(JSON.parse(endDate));

        const inputArr = [ title, userId, startDate, endDate];

        if(!(validation.hasValues(inputArr))) {
            return res.status(400).send(`400 - BAD REQUEST. All input is required. ${title} ${userId} ${startDate} ${endDate}`);
        }

        if(!(validation.isValidObjectId(userId))) {
            return res.status(400).send("400 - BAD REQUEST. Invalid id.");
        }

        if(!(validation.allStrings([title]))) {
            return res.status(400).send("400 - BAD REQUEST. Input must be of type string.");
        }

        // Create the project in the database
        const project = await Project.create({
            schemaVersion: PROJECT_SCHEMA_VERSION,
            title: title,
            responsible: userId,
            startDate: startDate,
            endDate: endDate
        });

        // Return new project
        res.status(201).json(project);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Retrieve all projects
// GET /api/projects/getAll - GET ALL PROJECTS
const getAllProjects = (async (req, res) => {
    try {
        const projects = await Project.find();

        res.status(200).json(projects);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Retrieve one project
// GET /api/projects/getOne/:id - GET ONE PROJECT
const getOneProject = (async (req, res) => {
    try {
        if(!(validation.isValidObjectId(req.params.id))) {
            return res.status(400).send("400 - BAD REQUEST. Invalid id.");
        }

        const project = await Project.findById(req.params.id);

        res.status(200).json(project);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Update one project
// PATCH /api/projects/updateOne/:id - UPDATE ONE PROJECT
const updateOneProject = (async (req, res) => {
    try {
      const projectId = req.params.id;
      const updatedData = req.body;
      const options = { new: true };
  
      const project = await Project.findByIdAndUpdate(
        projectId, updatedData, options
      );
  
      res.status(200).send(project);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
});

// Add team to project
// PUT /api/projects/addTeam/:id - ADD A TEAM TO PROJECT
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

        const project = await Project.findOneAndUpdate(
            { _id: req.params.id, },
            { 
                $push: { teams: team, },
                $inc: { teamCount: 1 }, 
            },
            { new: true }
        );

        res.status(200).json(project);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Remove team from project
// PUT /api/projects/removeTeam/:id - REMOVE A TEAM FROM PROJECT
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

        const project = await Project.findOneAndUpdate(
            { _id: req.params.id, },
            { 
                $pull: { teams: team, },
                $inc: { teamCount: -1 }, 
            },
            { new: true }
        );

        res.status(200).json(project);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Add department to project
// PUT /api/projects/addDepartment/:id - ADD A DEPARTMENT TO PROJECT
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

        const project = await Project.findOneAndUpdate(
            { _id: req.params.id, },
            { 
                $push: { departments: department, },
                $inc: { departmentCount: 1 }, 
            },
            { new: true }
        );

        res.status(200).json(project);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Remove department from project
// PUT /api/projects/removeDepartment/:id - REMOVE A DEPARTMENT FROM PROJECT
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

        const project = await Project.findOneAndUpdate(
            { _id: req.params.id, },
            { 
                $pull: { departments: department, },
                $inc: { departmentCount: -1 }, 
            },
            { new: true }
        );

        res.status(200).json(project);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete one project
// DELETE /api/projects/deleteOne/:id - DELETE ONE PROJECT
const deleteOneProject = (async (req, res) => {
    try {
      const projectId = req.params.id;
      const projectData = await Project.findByIdAndDelete(projectId);
      res.status(204).send(`Document with title ${projectData.title} has been deleted.`);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
});

module.exports = {
    createProject,
    getAllProjects,
    getOneProject,
    updateOneProject,
    addTeam,
    removeTeam,
    addDepartment,
    removeDepartment,
    deleteOneProject
}