const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/your_database_name", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((err) => {
    console.log("Error in MongoDB connection: " + err);
  });

// 여기에 기타 코드 (미들웨어 설정, 라우팅 등)를 작성합니다.
module.exports = mongoose;
