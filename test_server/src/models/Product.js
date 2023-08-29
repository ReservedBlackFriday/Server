const mongoose = require("../config/db");

const ProductSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  discount_rate: Number,
  amount: Number,
});

module.exports = mongoose.model("Product", ProductSchema);
