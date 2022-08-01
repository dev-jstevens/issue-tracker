const express = require("express");
const router = express.Router();

const {
    createTicket,
    getAllTickets,
    getOneTicket,
    updateOneTicket,
    addUser,
    removeUser,
    addTeam,
    removeTeam,
    addDepartment,
    removeDepartment,
    deleteOneTicket
} = require("../controllers/TicketController.js");

router.post("/create", createTicket);
router.get("/getAll", getAllTickets);
router.get("/getOne/:id", getOneTicket);
router.patch("/updateOne/:id", updateOneTicket);
router.put("/addUser/:id", addUser);
router.put("/removeUser/:id", removeUser);
router.put("/addTeam/:id", addTeam);
router.put("/removeTeam/:id", removeTeam);
router.put("/addDepartment/:id", addDepartment);
router.put("/removeDepartment/:id", removeDepartment);
router.delete("/deleteOne/:id", deleteOneTicket);

module.exports = router;