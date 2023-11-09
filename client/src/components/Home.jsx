import { Button, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";

function Home() {
  return (
    <Stack
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}>
      <Typography
        sx={{
          width: "60%",
          margin: "0 auto",
          textAlign: "center",
          color: "#004e92",
          fontSize: "1.4rem",
        }}>
        Welcome to pdfXtract! Easily upload your PDF, choose the pages you want,
        and create a new PDF in a snap.
      </Typography>
      <Button
        variant="outlined"
        sx={{ marginTop: "1rem" }}
        component={Link}
        to="/upload">
        Lets start
      </Button>
    </Stack>
  );
}

export default Home;
