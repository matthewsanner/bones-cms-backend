import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Box, FormControl, TextField, Button } from "@mui/material";
import useTheme from "@mui/material/styles/useTheme";

const CreateAccount = ({ setAuthenticated }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (field, value) => {
    setFormData((prevState) => ({ ...prevState, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const apiUrl = `${
        import.meta.env.VITE_API_BASE_URL
      }/users/create-account`;
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        credentials: "include", // Include cookies with the request
      });

      if (response.ok) {
        // Account creation successful, redirect to home page
        if (response.status === 201) {
          setAuthenticated(true);
        }
        navigate("/");
        toast.success("Created account successfully!");
      } else {
        // Handle error response from the server
        if (response.status && response.status === 400) {
          // Display a custom error message for duplicate username
          console.error(
            "Failed to create account because username already exists."
          );
          toast.error(
            "Username already exists. Please choose a different username."
          );
        } else {
          // Display a generic error message for other errors
          console.error("Failed to create account");
          toast.error("Failed to create account. Please try again later.");
        }
      }
    } catch (error) {
      console.error("Error creating account:", error);
      toast.error(
        "An error occurred while creating account. Please try again later."
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
            label="Email"
            variant="outlined"
            type="email"
            fullWidth
            sx={{ margin: "10px 0" }}
            value={formData.email}
            onChange={(e) => handleChange("email", e.target.value)}
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
            Create Account
          </Button>
        </form>
      </FormControl>
    </Box>
  );
};

export default CreateAccount;
