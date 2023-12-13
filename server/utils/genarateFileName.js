const uuid = require("uuid");
const getFileName = (prefix = "file", suffix = "pdf") => {
  const uniqueId = uuid.v4();
  return `${prefix}_${uniqueId}.${suffix}`;
};

module.exports = {
  getFileName,
};
