const validation = require("../middleware/validation.js");

const Organization = require("../models/OrganizationModel.js");

const { ORGANIZATION_SCHEMA_VERSION } = process.env;

// Create an organization
// POST /api/organizations/create - CREATE ORGANIZATION
const createOrganization = (async (req, res) => {
    try {
        // Get user input
        const {
            userId,
            userFirstName,
            userLastName,
            userRole,
            title,
            billingAddress,
            city,
            state,
            zip,
            country,
            phone
        } = req.body;

        // Validate user input
        if (!(
            userId
            && userFirstName
            && userLastName
            && userRole
            && title 
            && billingAddress 
            && city 
            && state 
            && zip 
            && country
            && phone )) {
            res.status(400).send("All input is required.");
        }

        // Check if organization already exists
        // Validate if organization exists in the database
        const alreadyOrganization = await Organization.findOne({ title });

        if (alreadyOrganization) {
            return res.status(409).send("Organization already exists. Search organization to join.");
        }

        // Create organization in the database
        const organization = await Organization.create({
            schemaVersion: ORGANIZATION_SCHEMA_VERSION,
            title,
            billingAddress,
            city,
            state,
            zip,
            country,
            phone,
            memberCount: 1,
            members: {
                userId: userId,
                firstName: userFirstName,
                lastName: userLastName,
                role: userRole
            }
        });

        // Return new organization
        res.status(201).json(organization);

    } catch (err) {
        console.log(err);
    }
});

// Retrieve all organizations
// GET /api/organizations/getAll - GET ALL ORGANIZATIONS
const getAllOrganizations = (async (req, res) => {
    try {
        const organizations = await Organization.find();

        res.status(200).json(organizations);
    } catch (err) {
        res.status(500).json({ message: error.message });
    }
});

// Retrieve one organization
// GET /api/organizations/getOne/:id - GET ONE ORGANIZATION
const getOneOrganization = (async (req, res) => {
    try {
        console.log(typeof req.params.id);

        const organization = await Organization.findById(req.params.id);

        res.status(200).json(organization);
    } catch (err) {
        res.status(500).json({ message: error.message });
    }
});

// Retrieve one organization by name
// GET /api/organizations/getOne/:name - GET ONE ORGANIZATION BY NAME
const getOrganizationByName = (async (req, res) => {
    try {
        const { name } = req.body;

        const organization = await Organization.findOne({ name });

        res.status(200).json(organization);
    } catch (err) {
        res.status(500).json({ message: error.message });
    }
});

// Update one organization
// PATCH /api/organizations/updateOne/:id - UPDATE ONE ORGANIZATION
const updateOneOrganization = (async (req, res) => {
    try {
      const organizationId = req.params.id;
      const updatedData = req.body;
      const options = { new: true };
  
      const result = await Organization.findByIdAndUpdate(
        organizationId, updatedData, options
      );
  
      res.status(200).send(result);
    } catch (err) {
      res.status(400).json({ message: error.message });
    }
});

// Add member to organization
// PUT /api/addMember/:id - ADD A MEMBER TO ORGANIZATION
const addMember = (async (req, res) => {
    try {
        const {
            userId,
            userFirstName,
            userLastName,
            userRole
        } = req.body;

        const inputArr = [
            req.params.id,
            userId,
            userFirstName,
            userLastName,
            userRole
        ];

        const checkStrArr = [
            userFirstName,
            userLastName,
            userRole
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
            role: userRole
        };

        const organization = await Organization.findOneAndUpdate(
            { _id: req.params.id, },
            { 
                $push: { members: member, },
                $inc: { memberCount: 1 }, 
            },
            { new: true }
        );

        res.status(200).json(organization);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Remove member of organization
// PUT /api/removeMember/:id - REMOVE A MEMBER OF ORGANIZATION
const removeMember = (async (req, res) => {
    try {
        const {
            userId,
            userFirstName,
            userLastName,
            userRole
        } = req.body;

        const inputArr = [
            req.params.id,
            userId,
            userFirstName,
            userLastName,
            userRole
        ];
        
        const checkStrArr = [
            userFirstName,
            userLastName,
            userRole
        ];

        if(!(validation.hasValues(inputArr))) {
            return res.status(400).send("400 - BAD REQUEST. All input is required.");
        }

        if(!(validation.isValidObjectId(req.params.id) 
        && validation.isValidObjectId(userId))) {
            return res.status(400).send("400 - BAD REQUEST. Invalid id.");
        }

        if(!(validation.allStrings(inputArr))) {
            return res.status(400).send("400 - BAD REQUEST. Input must be of type string.");
        }

        const member = {
            userId: userId,
            firstName: userFirstName,
            lastName: userLastName,
            role: userRole
        };

        const organization = await Organization.findOneAndUpdate(
            { _id: req.params.id, },
            { 
                $pull: { members: member, },
                $inc: { memberCount: -1 }, 
            },
            { new: true }
        );

        res.status(200).json(organization);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete one organization
// DELETE /api/organizations/deleteOne/:id - DELETE ONE ORGANIZATION
const deleteOneOrganization = (async (req, res) => {
    try {
      const organizationId = req.params.id;
      const organizationData = await Organization.findByIdAndDelete(organizationId);
      res.status(204).send(`Document with title ${organizationData.title} has been deleted.`);
    } catch (err) {
      res.status(400).json({ message: error.message });
    }
});

module.exports = {
    createOrganization,
    getAllOrganizations,
    getOneOrganization,
    getOrganizationByName,
    updateOneOrganization,
    addMember,
    removeMember,
    deleteOneOrganization
}