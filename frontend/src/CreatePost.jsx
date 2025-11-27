import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Box, FormControl, TextField, Button } from "@mui/material";
import useTheme from "@mui/material/styles/useTheme";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";

const CreatePost = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    content: "",
  });

  const handleChange = (field, value) => {
    setFormData((prevState) => ({ ...prevState, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const apiUrl = `${import.meta.env.VITE_API_BASE_URL}/posts`;
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        credentials: "include",
      });

      if (response.ok) {
        // Post creation successful, redirect to home page
        navigate("/");
        toast.success("Created post successfully!");
      } else {
        // Handle error response from the server
        console.error("Failed to create post");
        toast.error("Failed to create post. Please try again later.");
      }
    } catch (error) {
      console.error("Error creating post:", error);
      toast.error(
        "An error occurred while creating post. Please try again later."
      );
    }
  };

  // Custom toolbar options for the ReactQuill editor
  const toolbarOptions = [
    ["bold", "italic", "underline", "strike"], // Text style options
    ["blockquote", "code-block"], // Additional formatting options
    [{ list: "ordered" }, { list: "bullet" }], // Lists
    ["link", "image"], // Link and image insertion
  ];

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        margin: "20px 40px",
      }}>
      <FormControl
        sx={{
          width: "100%",
          [theme.breakpoints.up("md")]: {
            width: "90%",
          },
          [theme.breakpoints.up("lg")]: {
            width: "75%",
          },
        }}>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Title"
            variant="outlined"
            value={formData.title}
            fullWidth
            sx={{ margin: "10px 0" }}
            onChange={(e) => handleChange("title", e.target.value)}
          />
          <ReactQuill
            value={formData.content}
            sx={{ margin: "10px 0" }}
            onChange={(value) => handleChange("content", value)}
            modules={{ toolbar: toolbarOptions }} // Provide custom toolbar options
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ margin: "10px 0" }}>
            Create Post
          </Button>
        </form>
      </FormControl>
    </Box>
  );
};

export default CreatePost;
