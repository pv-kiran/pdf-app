const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../model/user");
// validation functions
const { signupValidation, signinValidation } = require("../utils/validation");
// jwt token genarating functions
const {
  getAccessToken,
  getRefreshToken,
  verifyRefreshToken,
} = require("../utils/token");

let refreshTokens = [];

const userSignup = async (req, res) => {
  const { error } = signupValidation.validate(req.body);
  // validation logic
  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details[0]?.message,
    });
  }
  const { email, password } = req.body;

  try {
    // checking for the existance of email / user
    const userExist = await User.findOne({ email: email });
    if (userExist) {
      return res
        .status(409)
        .json({ success: false, message: "Email already exists" });
    }

    // hashing the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // creation of new candidate
    const newUser = await User.create({
      ...req.body,
      password: hashedPassword,
    });

    newUser.password = undefined;

    res.status(201).json({
      sucess: true,
      newUser,
    });
  } catch (err) {
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

const userSignin = async (req, res) => {
  // Valiadtion logic
  const { error } = signinValidation.validate(req.body);
  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details[0]?.message,
    });
  }
  const { email, password } = req.body;

  try {
    // checking the existance of the user
    const userExist = await User.findOne({ email: email });
    if (userExist) {
      // checking the passowrd
      const isCorrectPassword = await bcrypt.compare(
        password,
        userExist.password
      );
      // password is correct
      if (isCorrectPassword) {
        // token configuration - access token
        const token = getAccessToken(userExist._id);

        // token configuration - refresh token
        const refreshToken = getRefreshToken(userExist._id);
        refreshTokens.push(refreshToken);

        userExist.token = token;
        userExist.password = undefined;

        // for cookie configuration
        const options = {
          expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
          httpOnly: true,
        };

        return res.status(200).cookie("token", token, options).json({
          success: true,
          user: userExist,
          refreshToken: refreshToken,
        });
      }
      // incorrect password
      return res.status(400).json({
        success: false,
        message: "Password is incorrect",
      });
    }
    return res.status(404).json({
      success: false,
      message: `Email doesn't exist`,
    });
  } catch (err) {
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

const refreshToken = (req, res) => {
  const { refreshToken } = req.body;
  if (refreshToken == null)
    return res.status(403).json({ error: "Invalid refresh token" });
  if (!refreshTokens.includes(refreshToken))
    return res.status(403).json({ error: "Invalid refresh token" });

  try {
    const decoded = verifyRefreshToken(refreshToken);
    const accessToken = getAccessToken(decoded.userId);
    res.json({ accessToken });
  } catch (err) {
    console.log("HEllo");
    return res.status(403).json({ error: "Invalid refresh token" });
  }
};

const userSignout = (req, res) => {
  refreshTokens = refreshTokens.filter((token) => token !== req.body.token);
  res
    .status(200)
    .cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    })
    .json({
      success: true,
      message: "Logout Success",
    });
};

module.exports = {
  userSignup,
  userSignin,
  refreshToken,
  userSignout,
};
