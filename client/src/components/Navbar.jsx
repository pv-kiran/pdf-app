import { Button } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { showToast } from "../functions/toastNotification";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const logout = useLogout();
  const navigate = useNavigate();

  const user = useSelector((state) => {
    return state?.auth?.user;
  });

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
      showToast("LOGOUT SUCCESS", "success");
    } catch (err) {
      showToast("Something Went Wrong", "error");
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="fixed"
        elevation={1}
        sx={{
          backgroundColor: "#132043",
          color: "#004e92",
          padding: ".3rem",
        }}>
        <Toolbar>
          <Typography variant="h4" noWrap component="div">
            PDFXtract
          </Typography>
          <Box sx={{ flexGrow: 1 }}></Box>
          {user ? (
            <Button variant="outlined" onClick={() => handleLogout()}>
              Logout
            </Button>
          ) : (
            <Button component={Link} to="/signin" variant="outlined">
              Signin
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Navbar;
