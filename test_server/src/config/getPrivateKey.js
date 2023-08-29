const fs = require("fs");
const path = require("path");

const privateKeyPath = path.join(__dirname, "./private_key.pem");
const privateKey = fs.readFileSync(privateKeyPath, "utf8");

console.log("Private Key Loaded"); // 이 로그는 이 모듈이 최초로 require될 때만 출력될 것입니다.

module.exports = privateKey;
