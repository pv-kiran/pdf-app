const { PDFDocument } = require("pdf-lib");
const axios = require("axios");

const { AWS, getBucketParams } = require("../utils/awsHelper");
const { getFileName } = require("../utils/genarateFileName");

const Pdf = require("../model/pdf");

const s3 = new AWS.S3();

const getAllPdf = async (req, res) => {
  try {
    const pdfFiles = await Pdf.find({});
    if (pdfFiles.length === 0) {
      return res.status(404).json({ success: false, message: "No pdf found" });
    }
    res.status(200).json({ success: true, pdfFiles });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "hi" });
  }
};

const getPdf = async (req, res) => {
  const { id } = req.params;
  try {
    const pdfInfo = await Pdf.findOne({ _id: id });
    if (pdfInfo) {
      return res.status(200).json({ success: true, pdfInfo });
    }
    return res.status(404).json({ success: false, message: "Not found" });
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const uploadPdf = async (req, res) => {
  const pdf = req.files?.pdf;
  const bucketParams = getBucketParams(pdf);

  s3.upload(bucketParams, async function (err, data) {
    if (err) {
      res.status(500).json({ message: "Internal Server Error" });
    }

    if (data) {
      try {
        const newPdf = await Pdf.create({
          user: req.userId,
          name: pdf?.name,
          link: data?.Location,
          type: "upload",
        });
        res.status(201).json({ message: "Success", newPdf });
      } catch (err) {
        res.status(500).json({ message: "Internal Server Error" });
      }
    }
  });
};

const extractPdf = async (req, res) => {
  const { id, selectedPages } = req.body;
  try {
    const pdf = await Pdf.findOne({ _id: id });
    if (!pdf) {
      return res.status(404).json({ success: false, message: "Pdf Not found" });
    }

    const response = await axios.get(pdf?.link, {
      responseType: "arraybuffer",
    });
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

    const fileName = getFileName();

    const params = getBucketParams(undefined, newPdfBytes, fileName);

    s3.upload(params, async function (err, data) {
      if (err) {
        res.status(500).send("Error uploading file to S3");
      } else {
        try {
          const newPdf = await Pdf.create({
            user: req.userId,
            name: fileName,
            link: data?.Location,
            type: "extract",
          });
          res.status(201).json({ message: "Success", newPdf });
        } catch (err) {
          res.status(500).json({ message: "Internal Server Error" });
        }
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const downloadPdf = async (req, res) => {
  const { id } = req.params;
  try {
    const pdf = await Pdf.findOne({ _id: id });
    if (!pdf) {
      return res.status(404).json({ success: false, message: "Pdf not found" });
    }
    const params = {
      Bucket: process.env.S3_BUCKET_NAME,
      Key: pdf?.name,
    };
    s3.getObject(params, (err, data) => {
      if (err) {
        return res
          .status(404)
          .json({ success: false, message: "No pdf found" });
      } else {
        res.setHeader(
          "Content-Disposition",
          "attachment; filename=" + pdf?.name
        );
        res.setHeader("Content-Type", `application/pdf`);
        res.send(data.Body);
      }
    });
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  getPdf,
  uploadPdf,
  extractPdf,
  downloadPdf,
  getAllPdf,
};
