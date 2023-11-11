const express = require("express");

const uploadPdf = require("../middlewares/fileUpload");
const { isLoggedIn } = require("../middlewares/authentication");
const router = express.Router();
const { AWS, getBucketParams } = require("../utils/awsHelper");

const { PDFDocument } = require("pdf-lib");
const axios = require("axios");
const s3 = new AWS.S3();

router.post("/upload", isLoggedIn, uploadPdf, (req, res) => {
  const pdf = req.files?.pdf;
  const bucketParams = getBucketParams(pdf);

  s3.upload(bucketParams, function (err, data) {
    if (err) {
      console.log("Error", err);
    }

    if (data) {
      console.log("Uploaded in:", data);
      res.status(200).json(data);
    }
  });
});

router.post("/extract", async (req, res) => {
  const { pdfUrl, selectedPages } = req.body;
  console.log(selectedPages);
  try {
    const response = await axios.get(pdfUrl, { responseType: "arraybuffer" });
    console.log(response);
    const originalPdfBytes = response.data;
    const originalPdfDoc = await PDFDocument.load(originalPdfBytes);

    // Create a new PDF document
    const newPdfDoc = await PDFDocument.create();

    // Copy the selected pages to the new document
    for (const pageNumber of selectedPages) {
      const [copiedPage] = await newPdfDoc.copyPages(originalPdfDoc, [
        pageNumber - 1,
      ]);
      newPdfDoc.addPage(copiedPage);
    }

    // Save the new PDF document
    const newPdfBytes = await newPdfDoc.save();

    console.log(newPdfBytes);

    const params = getBucketParams(undefined, newPdfBytes, "testing.pdf");

    console.log(params);

    // Upload the new PDF to S3
    // const params = {
    //   Bucket: process.env.S3_BUCKET_NAME,
    //   Key: "test.pdf",
    //   Body: newPdfBytes,
    //   ContentType: "application/pdf",
    //   ContentDisposition: "inline",
    //   ACL: "public-read",
    // };
    // s3.upload(params, function (err, data) {
    //   if (err) {
    //     console.log(err);
    //     res.status(500).send("Error uploading file to S3");
    //   } else {
    //     console.log(data);
    //     res.send("File uploaded successfully");
    //   }
    // });
  } catch (err) {
    console.log(err);
  }
  // Fetch the original PDF document
});

module.exports = router;
