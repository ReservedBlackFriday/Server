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
});

module.exports = mongoose.model("User", UserSchema);
