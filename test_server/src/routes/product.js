var express = require("express");
var router = express.Router();
const productController = require("../controllers/productController");
//var controller = require("../controllers");

router.get("/black_products", productController.registerUser);

router.post("/login", productController.loginUser);

module.exports = router;
