const { faker } = require("@faker-js/faker");
const User = require("../src/models/User");

for (let i = 0; i < 3000; i++) {
  const groups = ["A", "B", "C", "D", "E"];
  const randomGroup = groups[Math.floor(Math.random() * groups.length)];
  const faker_user = {
    email: faker.internet.email(),
    password: faker.internet.password(),
    bf_group: randomGroup,
  };
  const user = new User(faker_user);
  user.save();
}
