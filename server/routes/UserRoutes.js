const express = require("express");
const router = express.Router();

const {
    registerUser,
    loginUser,
    getAllUsers,
    getOneUser,
    updateOneUser,
    deleteOneUser
} = require("../controllers/UserController.js");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/getAll", getAllUsers);
router.get("/getOne/:id", getOneUser);
router.patch("/updateOne/:id", updateOneUser);
router.delete("/deleteOne/:id", deleteOneUser);

module.exports = router;