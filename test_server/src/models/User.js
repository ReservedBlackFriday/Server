const mongoose = require("../config/db");

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  bf_group: {
    type: String,
  },
  purchase_history: [
    {
      productId: mongoose.Schema.Types.ObjectId,
      date: {
        type: Date,
        default: Date.now,
      },
      // ... 다른 필요한 필드
    },
  ],
});

module.exports = mongoose.model("User", UserSchema);
