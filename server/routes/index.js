const express = require("express");
const router = express.Router();

const UserRoutes = require("./UserRoutes.js");
const OrganizationRoutes = require("./OrganizationRoutes.js");
const TeamRoutes = require("./TeamRoutes.js");
const DeprtmentRoutes = require("./DepartmentRoutes.js");
const ProjectRoutes = require("./ProjectRoutes.js");
const OperationRoutes = require("./OperationRoutes.js");
const TicketRoutes = require("./TicketRoutes.js");

// Test route
router.get("/", (req, res) => {
    res.send("Welcome to issue-tracker");
});

router.use("/users", UserRoutes);
router.use("/organizations", OrganizationRoutes);
router.use("/teams", TeamRoutes);
router.use("/departments", DeprtmentRoutes);
router.use("/projects", ProjectRoutes);
router.use("/operations", OperationRoutes);
router.use("/tickets", TicketRoutes);

module.exports = router;