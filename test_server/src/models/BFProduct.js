const mongoose = require("../config/db");

const BFProductSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "products", // 이 부분이 실제 Product 스키마와 연결을 지어줍니다.
    required: true,
  },
  discount_rate: {
    type: Number,
  },
  amount: {
    A: Number,
    B: Number,
    C: Number,
    D: Number,
    E: Number,
  },
});

module.exports = mongoose.model("BFProduct", BFProductSchema);
