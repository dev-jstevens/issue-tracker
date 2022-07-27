const express = require("express");
const router = express.Router();

const UserRoutes = require("./UserRoutes.js");
const OrganizationRoutes = require("./OrganizationRoutes.js");
const TeamRoutes = require("./TeamRoutes.js");
const DeprtmentRoutes = require("./DepartmentRoutes.js");

// Test route
router.get("/", (req, res) => {
    res.send("Welcome to issue-tracker");
});

router.use("/users", UserRoutes);
router.use("/organizations", OrganizationRoutes);
router.use("/teams", TeamRoutes);
router.use("/departments", DeprtmentRoutes);

module.exports = router;