"use strict";

const validation = require("../middleware/validation.js");

const Team = require("../models/TeamModel.js");

const { TEAM_SCHEMA_VERSION } = process.env;

// Create a team
// POST /api/teams/create - CREATE A TEAM
const createTeam = (async (req, res) => {
    try {
        const {
            title,
            organizationId,
            teamLead,
            userFirstName,
            userLastName
        } = req.body;
    
        const inputArr = [ title, organizationId, teamLead, userFirstName, userLastName ];
    
        if(!(validation.hasValues(inputArr))) {
            return res.status(400).send("400 - BAD REQUEST. All input is required.");
        }

        if(!(validation.isValidObjectId(organizationId) 
        && validation.isValidObjectId(teamLead))) {
            return res.status(400).send("400 - BAD REQUEST. Invalid id.");
        }

        if(!(validation.allStrings([title, userFirstName, userLastName]))) {
            return res.status(400).send("400 - BAD REQUEST. Input must be of type string.");
        }

        const member = {
            userId: teamLead,
            firstName: userFirstName,
            lastName: userLastName
        };

        // Create the team in the database
        const team = await Team.create({
            schemaVersion: TEAM_SCHEMA_VERSION,
            title: title,
            organizationId: organizationId,
            teamLead: teamLead,
            memberCount: 1,
            members: member
        });

        // Return new team
        res.status(201).json(team);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Retrieve all teams
// GET /api/teams/getAll - GET ALL TEAMS
const getAllTeams = (async (req, res) => {
    try {
        const teams = await Team.find();

        res.status(200).json(teams);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Retrieve one team
// GET /api/teams/getOne/:id - GET ONE TEAM
const getOneTeam = (async (req, res) => {
    try {
        if(!(validation.isValidObjectId(req.params.id))) {
            return res.status(400).send("400 - BAD REQUEST. Invalid id.");
        }

        const team = await Team.findById(req.params.id);

        res.status(200).json(team);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Update one team
// PATCH /api/teams/updateOne/:id - UPDATE ONE TEAM
const updateOneTeam = (async (req, res) => {
    try {
      const teamId = req.params.id;
      const updatedData = req.body;
      const options = { new: true };
  
      const team = await Team.findByIdAndUpdate(
        teamId, updatedData, options
      );
  
      res.status(200).send(team);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
});

// Add member to team
// PUT /api/teams/addMember/:id - ADD A MEMBER TO TEAM
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

        const team = await Team.findOneAndUpdate(
            { _id: req.params.id, },
            { 
                $push: { members: member, },
                $inc: { memberCount: 1 }, 
            },
            { new: true }
        );

        res.status(200).json(team);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Remove member from team
// PUT /api/teams/removeMember/:id - REMOVE A MEMBER FROM TEAM
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

        const team = await Team.findOneAndUpdate(
            { _id: req.params.id, },
            { 
                $pull: { members: member, },
                $inc: { memberCount: -1 }, 
            },
            { new: true }
        );

        res.status(200).json(team);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete one team
// DELETE /api/teams/deleteOne/:id - DELETE ONE TEAM
const deleteOneTeam = (async (req, res) => {
    try {
      const teamId = req.params.id;
      const teamData = await Team.findByIdAndDelete(teamId);
      res.status(204).send(`Document with title ${teamData.title} has been deleted.`);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
});

module.exports = {
    createTeam,
    getAllTeams,
    getOneTeam,
    updateOneTeam,
    addMember,
    removeMember,
    deleteOneTeam
}