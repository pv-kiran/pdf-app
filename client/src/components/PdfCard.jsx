import { Box, Button, Stack } from "@mui/material";
import { Document, Page } from "react-pdf";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function PdfCard() {
  const { uploadedFile } = useSelector((state) => {
    return state?.file;
  });
  return (
    <Box
      sx={{
        width: "25rem",
        margin: "5rem auto",
        padding: "1rem",
      }}>
      <Document file={uploadedFile?.link}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: ".75rem",
            padding: "2rem 3rem",
            paddingBottom: "1rem",
            boxShadow: "1rem 1rem 1rem 1rem rgba(0,0,0,.15)",
          }}>
          <Page pageNumber={1} height={200} width={250}></Page>
          <Stack direction="column" gap={2} marginTop={2} width="97%">
            <Button
              variant="outlined"
              component={Link}
              to={`/${uploadedFile?._id}/view`}>
              View Pdf
            </Button>
            <Button
              variant="outlined"
              component={Link}
              to={`/${uploadedFile?._id}/extract`}>
              Extract Pdf
            </Button>
          </Stack>
        </div>
      </Document>
    </Box>
  );
}

export default PdfCard;
