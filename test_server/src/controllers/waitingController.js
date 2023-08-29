const User = require("../models/User");
const crypto = require("crypto");

exports.verificateUserBFReservationPermissions = async (req, res) => {
  const { email, encryptedEmail } = req.body;

  if (email == undefined || encryptedEmail == undefined) {
    throw new Error("Not Exists Email or EncryptedEmail or Iv");
  }

  // email로 유저 찾기
  const user = await User.findOne({ email });
  // 유저가 없으면 에러
  if (!user) {
    return res.status(404).json({ message: "No user found with this email" });
  }
  try {
    const privateKey = require("../config/getPrivateKey");
    const decipher = crypto.createDecipheriv(
      "aes-256-ecb",
      Buffer.from(privateKey),
      null
    );
    let decryptedEmail = decipher.update(encryptedEmail, "base64", "utf8");
    decryptedEmail += decipher.final("utf8");

    if (email === decryptedEmail) {
      // 토근 부여해야 할듯..
      return res
        .status(200)
        .json({ message: "Perimission is successfully verified" });
    } else {
      return res
        .status(403)
        .json({ message: "Perimission is not successfully verified" });
    }
  } catch (err) {
    console.error(err); // 또는 console.error(err.message)
    return res.status(500).json({ message: err.message });
  }
};
