const express = require("express");
const router = express.Router();

const {
    createOperation,
    getAllOperations,
    getOneOperation,
    updateOneOperation,
    addTeam,
    removeTeam,
    addDepartment,
    removeDepartment,
    deleteOneOperation
} = require("../controllers/OperationController.js");

router.post("/create", createOperation);
router.get("/getAll", getAllOperations);
router.get("/getOne/:id", getOneOperation);
router.patch("/updateOne/:id", updateOneOperation);
router.put("/addTeam/:id", addTeam);
router.put("/removeTeam/:id", removeTeam);
router.put("/addDepartment/:id", addDepartment);
router.put("/removeDepartment/:id", removeDepartment);
router.delete("/deleteOne/:id", deleteOneOperation);

module.exports = router;