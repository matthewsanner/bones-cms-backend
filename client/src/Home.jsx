import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import DOMPurify from "dompurify";
import {
  Pagination,
  Box,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Typography,
} from "@mui/material";
import useTheme from "@mui/material/styles/useTheme";

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

export default function Home() {
  const theme = useTheme();
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  // Function to handle pagination navigation
  const handlePageChange = (event, pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const fetchUserData = async (userId) => {
    const apiUrl = `${import.meta.env.VITE_API_BASE_URL}/users/${userId}`;
    const response = await fetch(apiUrl, {
      credentials: "include", // Include cookies with the request
    });
    const userData = await response.json();
    return userData.username;
  };

  // Fetch paginated blog posts from the backend API, and retrieve usernames
  useEffect(() => {
    const apiUrl = `${
      import.meta.env.VITE_API_BASE_URL
    }/posts?page=${currentPage}&limit=10`;
    fetch(apiUrl, {
      method: "GET",
      credentials: "include",
    })
      .then((response) => response.json())
      .then(async (data) => {
        // For each post, fetch the associated user data and update the posts array
        for (const post of data.posts) {
          const username = await fetchUserData(post.author);
          post.username = username;
        }
        setPosts(data.posts);
        setTotalPages(data.totalPages);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        toast.error(
          "There was an error fetching post data. Please try again later."
        );
      });
  }, [currentPage]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        margin: "20px 40px",
      }}>
      {/* Display the list of blog posts */}
      {posts.map((post) => {
        // Function to extract the first paragraph
        const extractFirstParagraph = (content) => {
          const paragraphs = content.split("</p>");
          if (paragraphs.length > 1) {
            return `${paragraphs[0]}</p>`; // Include the closing </p> tag
          }
          return content; // If there's only one paragraph, return the original content
        };

        const truncatedContent = extractFirstParagraph(post.content);

        return (
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
                  __html: DOMPurify.sanitize(truncatedContent),
                }}></Typography>
            </CardContent>
            <CardActions sx={{ padding: 2 }}>
              {/* The link to the full post page */}
              <Link to={`/posts/${post._id}`}>Read More</Link>
            </CardActions>
          </Card>
        );
      })}
      {/* Pagination controls */}
      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={handlePageChange}
        sx={{ margin: 3 }}
      />
    </Box>
  );
}
