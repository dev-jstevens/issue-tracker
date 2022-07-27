"use strict";

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/UserModel.js");

const { USER_SCHEMA_VERSION, TOKEN_KEY } = process.env;

// Register a user
// POST /api/users/register - CREATE USER
const registerUser = (async (req, res) => {
    try {
        // Get user input
        const {
            firstName,
            lastName,
            email,
            password,
            isSuper,
            isAdmin,
            isIndividual,
            isEnterprise
        } = req.body;

        // Validate user input
        if (!(
            firstName 
            && lastName 
            && email 
            && password 
            && isSuper 
            && isAdmin 
            && isIndividual 
            && isEnterprise )) {
            res.status(400).send("All input is required.");
        }

        // Check if user already exists
        // Validate if user exists in the database
        const alreadyUser = await User.findOne({ email });

        if (alreadyUser) {
            return res.status(409).send("User already exists. Login to access account.");
        }

        // Encrypt user password
        encryptedPassword = await bcrypt.hash(password, 10);

        // Create user in our database
        const user = await User.create({
            schemaVersion: USER_SCHEMA_VERSION,
            firstName,
            lastName,
            email: email.toLowerCase(), // Sanitize: convert email to lowercase
            password: encryptedPassword,
            isSuper,
            isAdmin,
            isIndividual,
            isEnterprise, 
        });

        // Create token
        const token = jwt.sign(
            { userId: user._id, email },
            TOKEN_KEY,
            { expiresIn: "2h", }
        );

        // Save user token
        user.token = token;

        // Return new user
        res.status(201).json(user);

    } catch (err) {
        console.log(err);
    }

});

// Login a user
// POST /api/users/login - LOGIN USER
const loginUser = (async (req, res) => {
    try {
      // Get user input
      const { email, password } = req.body;
  
      // Validate user input
      if (!(email && password)) {
        res.status(400).send("All input is required");
      }
      // Validate if user exist in the database
      const user = await User.findOne({ email });
  
      if (user && (await bcrypt.compare(password, user.password))) {
        // Create token
        const token = jwt.sign(
          { user_id: user._id, email },
          process.env.TOKEN_KEY,
          {
            expiresIn: "2h",
          }
        );
  
        // save user token
        user.token = token;
  
        // user
        res.status(200).json(user);
      }
      res.status(400).send("Invalid Credentials");
    } catch (err) {
      console.log(err);
    }
});

// Get all users
// GET /api/users/getAll - GET ALL USERS
const getAllUsers = (async (req, res) => {
  try {
    const users = await User.find();

    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: error.message });
  }
});

// Get one user
// GET /api/users/getOne/:id - GET ONE USER
const getOneUser = (async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: error.message });
  }
});

// Update one user
// PATCH /api/users/updateOne/:id - UPDATE ONE USER
const updateOneUser = (async (req, res) => {
  try {
    const userId = req.params.id;
    const updatedData = req.body;
    const options = { new: true };

    const result = await User.findByIdAndUpdate(
      userId, updatedData, options
    );

    res.status(200).send(result);
  } catch (err) {
    res.status(400).json({ message: error.message });
  }
});

// Delete one user
// DELETE /api/users/deleteOne/:id - DELETE ONE USER
const deleteOneUser = (async (req, res) => {
  try {
    const userId = req.params.id;
    const userData = await User.findByIdAndDelete(userId);
    res.status(204).send(`Document with email ${userData.email} has been deleted.`);
  } catch (err) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = {
    registerUser,
    loginUser,
    getAllUsers,
    getOneUser,
    updateOneUser,
    deleteOneUser
}