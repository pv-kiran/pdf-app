import { Box } from "@mui/material";
import { useState, useEffect } from "react";
import { Document, Page } from "react-pdf";

function ViewPdf() {
  const [numPages, setNumPages] = useState(null);
  const [pageSize, setPageSize] = useState({ width: 300, height: 300 });

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  useEffect(() => {
    function updateSize() {
      const width = window.innerWidth * 0.6; // 80% of the viewport width
      const height = window.innerHeight * 0.7; // 80% of the viewport height
      setPageSize({ width, height });
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return (
    <Box sx={{ marginTop: "5rem" }}>
      <Document
        file="https://res.cloudinary.com/dk81bsiz2/image/upload/v1699300035/test_utrnfb.pdf"
        onLoadSuccess={onDocumentLoadSuccess}>
        <div
          style={{
            width: "60%",
            margin: "auto",
            backgroundColor: "transparent",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}>
          {Array.from(new Array(numPages)).map((item, index) => {
            return (
              <div
                key={index}
                style={{
                  marginBottom: ".75rem",
                  padding: "1.5rem",
                  boxShadow: "1rem 1rem 1rem 1rem rgba(0,0,0,.2)",
                  borderRadius: ".3rem",
                }}>
                <Page
                  pageNumber={index + 1}
                  width={pageSize.width}
                  height={pageSize.height}></Page>
              </div>
            );
          })}
        </div>
      </Document>
      ;
    </Box>
  );
}

export default ViewPdf;
