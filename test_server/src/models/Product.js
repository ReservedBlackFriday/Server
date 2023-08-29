const mongoose = require("../config/db");

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  discount_rate: {
    type: Number,
  },
  amount: {
    type: Number,
  },
});

module.exports = mongoose.model("Product", ProductSchema);
