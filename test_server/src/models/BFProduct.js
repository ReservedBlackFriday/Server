const mongoose = require("../config/db");

const BFProductSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product", // 이 부분이 실제 Product 스키마와 연결을 지어줍니다.
    required: true,
  },
  discount_rate: {
    type: Number,
  },
  discount_price: {
    type: Number,
  },
  amount_group: {
    A: Number,
    B: Number,
    C: Number,
    D: Number,
    E: Number,
  },
  amount: {
    type: Number,
  },
  lottery_users: [
    {
      userId: mongoose.Schema.Types.ObjectId,
      date: {
        type: Date,
        default: Date.now,
      },
      // ... 다른 필요한 필드
    },
  ],
});

module.exports = mongoose.model("BFProduct", BFProductSchema);
