import { Box, Button, Checkbox, Alert } from "@mui/material";
import { Document, Page } from "react-pdf";
import { useExtract } from "../hooks/useExtract";
import { useParams } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";

function ExtractPdf() {
  const { id } = useParams();

  const { data } = useFetch(`/pdf/${id}`);
  const {
    numPages,
    onDocumentLoadSuccess,
    handleSelect,
    handleExtract,
    downloadLink,
    handleDownload,
  } = useExtract();

  if (downloadLink) {
    return (
      <button
        onClick={() => handleDownload(downloadLink?.newPdf?._id)}
        style={{ marginTop: "5rem" }}>
        Download
      </button>
    );
  }

  return (
    <>
      {data?.pdfInfo ? (
        <Box
          sx={{
            marginTop: "5rem",
          }}>
          <Alert
            severity="info"
            sx={{
              width: {
                xl: "60%",
                lg: "60%",
                md: "50%",
                sm: "100%",
                xs: "100%",
              },
              margin: "auto",
            }}
            action={
              <Button
                color="primary"
                variant="contained"
                size="small"
                onClick={() => handleExtract(data?.pdfInfo?._id)}>
                Extract
              </Button>
            }>
            Select pages, start extracting.
          </Alert>
          <Box
            sx={{
              margin: "auto",
              marginTop: ".5rem",
              width: {
                xl: "60%",
                lg: "60%",
                md: "50%",
                sm: "100%",
                xs: "100%",
              },
              height: "74vh",
              padding: ".2rem",
              overflowY: "scroll",
              boxShadow: "1rem 1rem 4rem 2rem rgba(0,0,0,.05)",
              borderRadius: ".5rem",
            }}>
            <Document
              file={data?.pdfInfo?.link}
              onLoadSuccess={onDocumentLoadSuccess}>
              <Box className="pdf-container">
                {Array.from(new Array(numPages)).map((item, index) => {
                  return (
                    <Box
                      key={index + 1}
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: ".75rem",
                        position: "relative",
                      }}>
                      <Checkbox
                        onChange={() => handleSelect(index + 1)}
                        sx={{
                          position: "absolute",
                          top: "-.4rem",
                          right: "1.8rem",
                          zIndex: "3",
                        }}></Checkbox>

                      <Page
                        pageNumber={index + 1}
                        width={150}
                        height={100}></Page>
                    </Box>
                  );
                })}
              </Box>
            </Document>
          </Box>
        </Box>
      ) : (
        <div style={{ marginTop: "5rem" }}>Error</div>
      )}
    </>
  );
}

export default ExtractPdf;
