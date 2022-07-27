const express = require("express");
const router = express.Router();

const UserRoutes = require("./UserRoutes.js");
const OrganizationRoutes = require("./OrganizationRoutes.js");
const TeamRoutes = require("./TeamRoutes.js");

// Test route
router.get("/", (req, res) => {
    res.send("Welcome to issue-tracker");
});

router.use("/users", UserRoutes);
router.use("/organizations", OrganizationRoutes);
router.use("/teams", TeamRoutes);

module.exports = router;