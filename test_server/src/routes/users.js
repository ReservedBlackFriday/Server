var express = require("express");
var router = express.Router();
const userController = require("../controllers/userController");
//var controller = require("../controllers");

router.post("/signup", userController.registerUser);

router.post("/login", userController.loginUser);

router.patch("/bf_group", userController.addBFGroup);

module.exports = router;
