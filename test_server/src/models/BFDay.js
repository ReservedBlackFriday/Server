const mongoose = require("../config/db");

const BFDaySchema = new mongoose.Schema({
  group_id: {
    type: String,
    required: true,
  },
  bf_day: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model("BFDay", BFDaySchema);
