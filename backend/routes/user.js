const express = require("express");

const UserController = require("../controllers/user");
const checkFile = require('../middleware/file');

const router = express.Router();

router.post("/signup", checkFile, UserController.createUser);

router.post("/login", UserController.userLogin);

router.get("/getUsers", UserController.getUsers);

router.post("/deleteUser", UserController.deleteUser);

module.exports = router;
