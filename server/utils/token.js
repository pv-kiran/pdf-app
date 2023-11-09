const jwt = require("jsonwebtoken");

const getAccessToken = (userId) => {
  return jwt.sign({ userId: userId }, process.env.SECRET_KEY, {
    expiresIn: "15m",
  });
};

const getRefreshToken = (userId) => {
  return jwt.sign({ userId: userId }, process.env.REFRESH_SECRET_KEY, {
    expiresIn: "90d",
  });
};

const verifyAccessToken = (token) => {
  return jwt.verify(token, process.env.SECRET_KEY);
};

const verifyRefreshToken = (token) => {
  return jwt.verify(token, process.env.REFRESH_SECRET_KEY);
};

module.exports = {
  getAccessToken,
  getRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
};
