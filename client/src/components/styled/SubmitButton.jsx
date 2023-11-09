/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";

const ColorButton = styled(Button)(({ theme }) => ({
  backgroundColor: "#419197",
  fontsize: "2rem",
  marginTop: "-3rem",
  borderRadius: "5px",
  padding: ".8rem",
  position: "relative",
  color: "white",
  letterSpacing: "2px",
  "&:hover": {
    backgroundColor: "#2CE1FE",
  },
}));

function SubmitButton({ label }) {
  return <ColorButton type="submit">{label}</ColorButton>;
}

export default SubmitButton;
