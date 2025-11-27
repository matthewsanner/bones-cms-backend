import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { toast } from "react-toastify";
import DOMPurify from "dompurify";
import {
  Box,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Typography,
  Button,
} from "@mui/material";
import useTheme from "@mui/material/styles/useTheme";

const BlogPost = ({ authenticated }) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [authorizedToEdit, setAuthorizedToEdit] = useState(false);

  // Function to format the date to a more readable format
  const formatDateTime = (dateTimeString) => {
    const date = new Date(dateTimeString);

    // Get individual date components
    const year = date.getFullYear();
    const month = date.toLocaleString("default", { month: "long" });
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();

    // Determine AM or PM
    const amOrPm = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 || 12; // Convert to 12-hour clock format

    // Return the formatted date and time
    return `${month} ${day}, ${year} at ${formattedHours}:${minutes
      .toString()
      .padStart(2, "0")} ${amOrPm}`;
  };

  // Function to fetch user data by userId
  const fetchUserData = async (userId) => {
    const apiUrl = `${import.meta.env.VITE_API_BASE_URL}/users/${userId}`;
    const response = await fetch(apiUrl, {
      credentials: "include", // Include cookies with the request
    });
    const userData = await response.json();
    return userData;
  };

  useEffect(() => {
    const apiUrl = `${import.meta.env.VITE_API_BASE_URL}/posts/${postId}`;
    fetch(apiUrl, {
      credentials: "include",
    })
      .then((response) => response.json())
      .then(async (data) => {
        const userData = await fetchUserData(data.author);
        data.username = userData.username;
        setPost(data);

        // Fetch the user ID of the currently signed-in user
        const userStatusApiUrl = `${
          import.meta.env.VITE_API_BASE_URL
        }/users/status`;
        const userStatusResponse = await fetch(userStatusApiUrl, {
          method: "GET",
          credentials: "include", // Include cookies in the request
        });
        const userStatusData = await userStatusResponse.json();
        const authenticatedUserId = userStatusData.userId;

        // Check if the current user is authorized to edit the post
        if (authenticated && authenticatedUserId === data.author) {
          setAuthorizedToEdit(true);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        toast.error(
          "An error occurred while retrieving post. Please try again later."
        );
      });
  }, [postId, authenticated]);

  if (!post) {
    return null;
  }

  // Define a function to handle post deletion
  const handleDeletePost = (postId) => {
    const apiUrl = `${import.meta.env.VITE_API_BASE_URL}/posts/${postId}`;
    // Send a DELETE request to delete the post
    fetch(apiUrl, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((response) => {
        if (response.ok) {
          // Handle the successful deletion
          navigate(`/`);
          console.log("Post deleted successfully!");
          toast.success("Post deleted successfully!");
        } else {
          // Handle error response from the server
          console.error("Failed to delete post");
          toast.error("Failed to delete post. Please try again later.");
        }
      })
      .catch((error) => {
        // Handle any other errors that may occur during the request
        console.error("Error deleting post:", error);
        toast.error(
          "An error occurred while deleting post. Please try again later."
        );
      });
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        margin: "20px 40px",
      }}>
      <Card
        key={post._id}
        variant="outlined"
        sx={{
          margin: 3,
          width: "100%", // Default width for screens smaller than large
          [theme.breakpoints.up("lg")]: {
            width: "80%", // 80% width for screens large and larger
          },
        }}>
        <CardHeader
          title={post.title}
          subheader={`Posted by ${post.username} on ${formatDateTime(
            post.date
          )}`}
        />
        <CardContent sx={{ py: 0 }}>
          <Typography
            variant="body1"
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(post.content),
            }}></Typography>
        </CardContent>
        <CardActions sx={{ padding: 2 }}>
          {authorizedToEdit && (
            <Button
              component={Link}
              to={`/posts/${post._id}/edit`}
              variant="contained"
              color="primary"
              style={{ marginRight: "10px" }}>
              Edit Post
            </Button>
          )}
          {authorizedToEdit && (
            <Button
              onClick={() => handleDeletePost(post._id)}
              variant="contained"
              color="error"
              style={{ marginRight: "10px" }}>
              Delete Post
            </Button>
          )}
          <Link to={"/"}>Back to Home</Link>
        </CardActions>
      </Card>
    </Box>
  );
};

export default BlogPost;
