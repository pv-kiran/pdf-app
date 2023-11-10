const express = require("express");
const uploadPdf = require("../middlewares/fileUpload");
const { isLoggedIn } = require("../middlewares/authentication");
const router = express.Router();

router.post("/upload", isLoggedIn, uploadPdf, (req, res) => {
  res.json({ file: req.files });
});

module.exports = router;
