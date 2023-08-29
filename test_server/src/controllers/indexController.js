const User = require("../models/User");

exports.countBFGroupbyUser = async (req, res) => {
  const groups = ["A", "B", "C", "D", "E"]; // 이 부분은 실제 사용할 그룹 목록으로 대체하세요.
  const counts = {};

  try {
    for (const group of groups) {
      const count = await User.countDocuments({ bf_group: group });
      counts[group] = count;
    }

    res
      .status(200)
      .json({
        message: "Number of users per group successfully queried",
        count_list: counts,
      });
  } catch (err) {
    console.error(err); // 또는 console.error(err.message)
    res.status(500).json({ message: err.message });
  }
};
