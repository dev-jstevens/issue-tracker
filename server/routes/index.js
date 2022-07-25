const express = require("express");
const router = express.Router();

const UserRoutes = require("./UserRoutes.js");

// Test route
router.get("/", (req, res) => {
    res.send("Welcome to issue-tracker");
});

router.use("/users", UserRoutes);

module.exports = router;