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
    deleteOneTeam
}