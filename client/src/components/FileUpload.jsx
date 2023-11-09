import { Box } from "@mui/material";
import { MdPictureAsPdf } from "react-icons/md";
function FileUpload() {
  return (
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
          style={{ fontSize: "3rem", marginBottom: "1rem" }}></MdPictureAsPdf>
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
        />
      </div>
    </Box>
  );
}

export default FileUpload;
