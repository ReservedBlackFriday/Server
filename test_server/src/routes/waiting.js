var express = require("express");
var router = express.Router();
const waitingController = require("../controllers/waitingController");
//var controller = require("../controllers");

router.post("/", waitingController.verificateUserBFReservationPermissions);

module.exports = router;
