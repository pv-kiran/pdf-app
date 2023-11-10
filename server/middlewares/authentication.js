const { verifyAccessToken } = require("../utils/token");

const isLoggedIn = (req, res, next) => {
  // token may be in authentication header or in cookies
  const authToken =
    req.headers["authorization"]?.replace("Bearer ", "") || req.cookies.token;
  if (!authToken) {
    return res.status(401).json({
      message: "Token is missing",
    });
  }
  try {
    const decoded = verifyAccessToken(authToken);
    req.userId = decoded.userId;
    next();
  } catch (e) {
    return res.status(401).json({
      message: "Invalid Token",
    });
  }
};

module.exports = {
  isLoggedIn,
};
