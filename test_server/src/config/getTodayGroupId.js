const BFDay = require("../models/BFDay");

const getGroupId = async () => {
  const now = new Date();
  const today =
    now.getFullYear() + "-0" + (now.getMonth() + 1) + "-" + now.getDate();

  try {
    const bfDayData = await BFDay.findOne({ bf_day: today });
    if (bfDayData) {
      const groupId = bfDayData.group_id;
      console.log("Today and Group Id: ", today, "->", groupId);
      return groupId;
    } else {
      console.log("No data found for today.");
      return null;
    }
  } catch (err) {
    console.error("Error occurred:", err);
    return null;
  }
};

module.exports = getGroupId;
