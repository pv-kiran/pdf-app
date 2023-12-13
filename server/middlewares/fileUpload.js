const uploadFile = (req, res, next) => {
  if (!req.files || !req.files.pdf) {
    return res.status(400).json({
      success: false,
      message: "Please upload a file",
    });
  }

  const pdf = req.files.pdf;

  // only pdf files
  if (pdf.mimetype !== "application/pdf") {
    return res.status(400).json({
      success: false,
      message: "Only pdf files are allowed",
    });
  }

  next();
};

module.exports = uploadFile;
