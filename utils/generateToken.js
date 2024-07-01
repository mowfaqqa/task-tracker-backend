const jwt = require("jsonwebtoken");

const secretKey = "Zxj#45$yHg$Gh6!k2s5&";
const generateToken = (id) => {
  return jwt.sign({ userId: id }, secretKey, {
    expiresIn: "1h",
  });
};

module.exports = generateToken;
