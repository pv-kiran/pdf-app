const convertFileSizeToKB = (sizeInBytes) => {
  let sizekb = sizeInBytes / 1024;
  return sizekb.toFixed(0);
};

export default convertFileSizeToKB;
