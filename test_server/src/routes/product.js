var express = require("express");
var router = express.Router();
const productController = require("../controllers/productController");
//var controller = require("../controllers");

router.get("/black_friday/list", productController.getBFProductList);

router.get("/black_friday/:id", productController.getBFProduct);

module.exports = router;
