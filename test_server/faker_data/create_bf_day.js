const BFDay = require("../src/models/BFDay");

const group = ["A", "B", "C", "D", "E"];
const day = [
  "2023-08-28",
  "2023-08-29",
  "2023-08-30",
  "2023-08-31",
  "2023-09-01",
];

for (var i = 0; i < 5; i++) {
  const bfDay = new BFDay({
    group_id: group[i],
    bf_day: day[i],
  });
  bfDay.save();
}
