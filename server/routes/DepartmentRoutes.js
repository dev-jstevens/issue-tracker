const express = require("express");
const router = express.Router();

const {
    createDepartment,
    getAllDepartments,
    getOneDepartment,
    updateOneDepartment,
    addMember,
    removeMember,
    deleteOneDepartment
} = require("../controllers/DepartmentController.js");

router.post("/create", createDepartment);
router.get("/getAll", getAllDepartments);
router.get("/getOne/:id", getOneDepartment);
router.patch("/updateOne/:id", updateOneDepartment);
router.put("/addMember/:id", addMember);
router.put("/removeMember/:id", removeMember);
router.delete("/deleteOne/:id", deleteOneDepartment);

module.exports = router;