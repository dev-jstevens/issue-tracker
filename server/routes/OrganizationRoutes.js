const express = require("express");
const router = express.Router();

const {
    createOrganization,
    getAllOrganizations,
    getOneOrganization,
    getOrganizationByName,
    updateOneOrganization,
    addMember,
    removeMember,
    deleteOneOrganization
} = require("../controllers/OrganizationController.js");

router.post("/create", createOrganization);
router.get("/getAll", getAllOrganizations);
router.get("/getOne/:id", getOneOrganization);
router.get("/getOneByName/:name", getOrganizationByName);
router.patch("/updateOne/:id", updateOneOrganization);
router.put("/addMember/:id", addMember);
router.put("/removeMember/:id", removeMember);
router.delete("/deleteOne/:id", deleteOneOrganization);

module.exports = router;