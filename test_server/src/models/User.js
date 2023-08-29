const mongoose = require("../config/db");

const UserSchema = new mongoose.Schema({
  username: String,
  password: String,
  // 다른 필드
});

module.exports = mongoose.model("User", UserSchema);
