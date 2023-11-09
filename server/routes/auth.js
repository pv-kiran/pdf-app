const express = require("express");
const router = express.Router();

const {
  userSignup,
  userSignin,
  userSignout,
  refreshToken,
} = require("../controllers/authController");

// @method - POST
// Description - For user signup
// request body - name , email , password , mobile
router.post("/signup", userSignup);

// @method - POST
// Description - For user signin
// request body - email, pawwsord
router.post("/signin", userSignin);

// @method - POST
// Description - For token refresh
// request body - refreshToken
router.post("/refresh-token", refreshToken);

// @method - GET
// Description - For user signout
router.delete("/signout", userSignout);

module.exports = router;
