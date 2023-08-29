var express = require("express");
var router = express.Router();
const indexController = require("../controllers/indexController");
/* GET home page. */
router.get("/index/count/bf_group", indexController.countBFGroupbyUser);

module.exports = router;
