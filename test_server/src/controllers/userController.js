// const db = require("../models");
const User = require("../models/User");
const bcrypt = require("bcrypt");

// 회원가입 컨트롤러 (근로자)
exports.registerUser = async (req, res) => {
  try {
    // 클라이언트에서 받은 email과 password
    const { email, password } = req.body;

    // email로 유저 찾기
    const existingUser = await User.findOne({ email });

    // 유저가 이미 있으면 에러
    if (existingUser) {
      return res
        .status(409)
        .json({ error: "User with this email already exists" });
    }

    // 비밀번호 해싱
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 새 유저 생성
    const newUser = new User({
      email,
      password: hashedPassword,
    });

    // 유저를 데이터베이스에 저장
    await newUser.save();

    // 회원가입 성공 (이 부분에서 JWT 토큰을 생성하거나 다른 작업을 할 수 있습니다.)
    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
};

// 로그인 컨트롤러
exports.loginUser = async (req, res) => {
  try {
    // 클라이언트에서 받은 email과 password
    const { email, password } = req.body;

    // email로 유저 찾기
    const user = await User.findOne({ email });

    // 유저가 없으면 에러
    if (!user) {
      return res.status(401).json({ message: "No user found with this email" });
    }

    // 비밀번호 확인
    const isMatch = await bcrypt.compare(password, user.password);

    // 비밀번호가 일치하지 않으면 에러
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // 로그인 성공 (이 부분에서 JWT 토큰을 생성하거나 다른 작업을 할 수 있습니다.)
    res.status(200).json({ message: "Logged in successfully", user });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

// 사용자 BFDay 그룹 추가 컨트롤러
exports.addBFGroup = async (req, res) => {
  try {
    // 클라이언트에서 받은 email
    const { email, bf_group } = req.body;

    // email로 유저 찾기
    const user = await User.findOne({ email });

    // 유저가 없으면 에러
    if (!user) {
      return res.status(401).json({ message: "No user found with this email" });
    }
    user["bf_group"] = bf_group;
    res.status(200).json({
      message: "Adding BF Group in successfully",
      bf_group: bf_group,
    });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};
