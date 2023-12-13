const AWS = require("aws-sdk");

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
});

const getBucketParams = (pdf, pdfBytes, pdfName) => {
  const params = {
    Bucket: process.env.S3_BUCKET_NAME,
    Body: pdfBytes ?? pdf?.data,
    Key: pdfName ?? pdf?.name,
    ContentType: "application/pdf",
    ContentDisposition: "inline",
    ACL: "public-read",
  };
  return params;
};

module.exports = {
  AWS,
  getBucketParams,
};
