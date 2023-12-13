import { Box, Stack, Typography, CircularProgress } from "@mui/material";
import {
  MdPictureAsPdf,
  MdOutlineDriveFolderUpload,
  MdDelete,
} from "react-icons/md";
import PdfCard from "./PdfCard";

import { useUpload } from "../hooks/useUpload";
import convertFileSizeToKB from "../functions/convertSize";

import { useSelector } from "react-redux";

function FileUpload() {
  const { pdf, handleChange, handleClear, handleSubmit } = useUpload();

  const { uploadedFile, loading } = useSelector((state) => {
    return state?.file;
  });

  return (
    <>
      {uploadedFile ? (
        <PdfCard></PdfCard>
      ) : (
        <Box sx={{ marginTop: "7rem" }}>
          <div
            style={{
              border: "2px dotted gray",
              padding: "2rem",
              textAlign: "center",
              width: "75%",
              margin: "auto",
              cursor: "pointer",
              color: "#fff",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#4c515c",
            }}>
            <MdPictureAsPdf
              style={{
                fontSize: "3rem",
                marginBottom: "1rem",
              }}></MdPictureAsPdf>
            <label htmlFor="fileInput">
              Ready to extract?{" "}
              <span
                style={{
                  color: "#132043",
                  borderBottom: "1px solid #132043",
                  padding: ".1rem",
                }}>
                click here to browse
              </span>{" "}
              pdf files.
            </label>
            <input
              type="file"
              id="fileInput"
              accept=".pdf"
              style={{ display: "none" }}
              onChange={(e) => handleChange(e)}
            />
          </div>
          {pdf && (
            <Box
              sx={{
                width: "75%",
                margin: "1rem auto",
                backgroundColor: "#fff",
                padding: "1rem 1rem",
                borderRadius: ".3rem",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}>
              <Typography sx={{ fontSize: "1.2rem" }}>{pdf?.name}</Typography>
              <Typography sx={{ fontSize: "1.2rem" }}>{`${convertFileSizeToKB(
                pdf?.size
              )} kb`}</Typography>
              {loading ? (
                <CircularProgress></CircularProgress>
              ) : (
                <Stack direction="row" gap={1} sx={{ cursor: "pointer" }}>
                  <MdOutlineDriveFolderUpload
                    color="green"
                    size="1.5rem"
                    onClick={() => handleSubmit()}></MdOutlineDriveFolderUpload>
                  <MdDelete
                    color="red"
                    size="1.5rem"
                    onClick={() => handleClear()}></MdDelete>
                </Stack>
              )}
            </Box>
          )}
        </Box>
      )}
    </>
  );
}

export default FileUpload;
