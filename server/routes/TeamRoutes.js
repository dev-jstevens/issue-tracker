const express = require("express");
const router = express.Router();

const {
    createTeam,
    deleteOneTeam
} = require("../controllers/TeamController.js");

router.post("/create", createTeam);
router.delete("/deleteOne/:id", deleteOneTeam);

module.exports = router;