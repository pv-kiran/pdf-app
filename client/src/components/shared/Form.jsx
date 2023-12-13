/* eslint-disable no-useless-escape */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

import { Link } from "react-router-dom";

import { getFormData } from "../../functions/formData";

import { useForm } from "../../hooks/useForm";

import SubmitButton from "../styled/SubmitButton";

function Form({ formType }) {
  const formData = getFormData(formType);

  const {
    values: user,
    handleChange,
    handleSubmit,
    errors,
  } = useForm(formData);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}>
        <Box
          component="form"
          autoComplete="off"
          onSubmit={(e) => {
            handleSubmit(e, formType, user);
          }}
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "75px",
            borderRadius: "5px",
            padding: "3rem 2rem",
            width: "35%",
            boxShadow: "1rem 1rem 2rem 2.5rem rgba(0,0,0, .05)",
            backgroundColor: "#164863",
          }}>
          {formType === "signup" && (
            <TextField
              label="Name"
              variant="outlined"
              sx={{
                width: "100%",
                height: ".6rem",
              }}
              name="name"
              value={user.name}
              onChange={(e) => handleChange(e)}
              error={Boolean(errors.name)}
              helperText={errors.name}
            />
          )}
          <TextField
            label="Email"
            variant="outlined"
            sx={{
              width: "100%",
              height: ".6rem",
            }}
            name="email"
            value={user.email}
            onChange={(e) => handleChange(e)}
            error={Boolean(errors.email)}
            helperText={errors.email}
          />
          {formType === "signup" && (
            <TextField
              label="Mobile"
              variant="outlined"
              sx={{
                width: "100%",
                height: ".6rem",
              }}
              name="mobile"
              value={user.mobile}
              type="text"
              onChange={(e) => handleChange(e)}
              error={Boolean(errors.mobile)}
              helperText={errors.mobile}
            />
          )}
          <TextField
            label="Password"
            variant="outlined"
            sx={{
              width: "100%",
              height: ".6rem",
            }}
            name="password"
            value={user.password}
            type="password"
            onChange={(e) => handleChange(e)}
            error={Boolean(errors.password)}
            helperText={errors.password}
          />
          <Box
            sx={{
              display: "flex",
              justifyContent: "end",
            }}>
            <Typography
              sx={{
                fontSize: { lg: "1rem", md: ".8rem", sm: ".8rem" },
                cursor: "pointer",
                textDecoration: "none",
                color: "#2CE1FE",
                marginTop: "-1rem",
                marginBottom: "-1.3rem",
                "&:hover": {
                  color: "#0AE4B3",
                },
              }}
              component={Link}
              to={`/${formType === "signup" ? "signin" : "signup"}`}>
              {formType === "signup"
                ? "Alreay have an account ?"
                : "Don't have an account ? Signup"}
            </Typography>
          </Box>
          <SubmitButton label={formType.toUpperCase()}></SubmitButton>
        </Box>
      </Box>
    </>
  );
}

export default Form;
