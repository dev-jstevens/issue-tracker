const express = require("express");
const router = express.Router();

const {
    createProject,
    getAllProjects,
    getOneProject,
    updateOneProject,
    addTeam,
    removeTeam,
    addDepartment,
    removeDepartment,
    deleteOneProject
} = require("../controllers/ProjectController.js");

router.post("/create", createProject);
router.get("/getAll", getAllProjects);
router.get("/getOne/:id", getOneProject);
router.patch("/updateOne/:id", updateOneProject);
router.put("/addTeam/:id", addTeam);
router.put("/removeTeam/:id", removeTeam);
router.put("/addDepartment/:id", addDepartment);
router.put("/removeDepartment/:id", removeDepartment);
router.delete("/deleteOne/:id", deleteOneProject);

module.exports = router;