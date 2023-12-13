const express = require("express");

const uploadFile = require("../middlewares/fileUpload");
const { isLoggedIn } = require("../middlewares/authentication");
const {
  getPdf,
  uploadPdf,
  extractPdf,
  downloadPdf,
  getAllPdf,
} = require("../controllers/pdfController");
const router = express.Router();

// @Type - GET
//  description - Fetch all the pdf files
router.get("/all", getAllPdf);

// @Type - GET
// Paramter - id of pdf
//  description - To fetch the pdf
router.get("/:id", getPdf);

// @Type - POST
//  description - Upload the pdf
router.post("/upload", isLoggedIn, uploadFile, uploadPdf);

// @Type - POST
//  description - Extract the pdf
router.post("/extract", isLoggedIn, extractPdf);

// @Type - GET
//  description - Download the pdf
router.get("/:id/download", isLoggedIn, downloadPdf);

module.exports = router;
