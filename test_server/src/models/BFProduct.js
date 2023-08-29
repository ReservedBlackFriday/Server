const mongoose = require("../config/db");

const BlackFridayProductSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "products", // 이 부분이 실제 Product 스키마와 연결을 지어줍니다.
    required: true,
  },
  discount_rate: {
    type: Number,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("BlackFridayProduct", BlackFridayProductSchema);
