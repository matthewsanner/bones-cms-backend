import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Box, FormControl, TextField, Button } from "@mui/material";
import useTheme from "@mui/material/styles/useTheme";

const Login = ({ setAuthenticated }) => {
  const theme = useTheme();
  const navigate = useNavigate(); // Hook to navigate to different routes
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (field, value) => {
    setFormData((prevState) => ({ ...prevState, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const apiUrl = `${import.meta.env.VITE_API_BASE_URL}/users/login`;
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        credentials: "include",
      });

      if (response.ok) {
        setAuthenticated(true);
        navigate("/");
        toast.success("Signed in successfully!");
      } else {
        // Handle error response from the server
        console.error("Login failed");
        toast.error("Failed to login. Please try again later.");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      toast.error(
        "An error occurred while submitting login. Please try again later."
      );
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        margin: "40px 20px",
      }}>
      <FormControl
        sx={{
          width: "80%",
          [theme.breakpoints.up("sm")]: {
            width: "50%",
          },
          [theme.breakpoints.up("md")]: {
            width: "40%",
          },
          [theme.breakpoints.up("lg")]: {
            width: "30%",
          },
        }}>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Username"
            variant="outlined"
            type="text"
            fullWidth
            sx={{ margin: "10px 0" }}
            value={formData.username}
            onChange={(e) => handleChange("username", e.target.value)}
          />
          <TextField
            label="Password"
            variant="outlined"
            type="password"
            fullWidth
            sx={{ margin: "10px 0" }}
            value={formData.password}
            onChange={(e) => handleChange("password", e.target.value)}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ margin: "10px 0" }}>
            Login
          </Button>
        </form>
      </FormControl>
    </Box>
  );
};

export default Login;
