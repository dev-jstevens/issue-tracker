const express = require("express");
const router = express.Router();

const {
    createTeam,
    getAllTeams,
    getOneTeam,
    updateOneTeam,
    addMember,
    removeMember,
    deleteOneTeam
} = require("../controllers/TeamController.js");

router.post("/create", createTeam);
router.get("/getAll", getAllTeams);
router.get("/getOne/:id", getOneTeam);
router.patch("/updateOne/:id", updateOneTeam);
router.put("/addMember/:id", addMember);
router.put("/removeMember/:id", removeMember);
router.delete("/deleteOne/:id", deleteOneTeam);

module.exports = router;