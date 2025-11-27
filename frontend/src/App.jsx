import "./App.css";
import { useState, useEffect } from "react";
import {
  Route,
  Routes,
  Link,
  useNavigate,
  Navigate,
  useParams,
} from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Home from "./Home";
import BlogPost from "./BlogPost";
import CreatePost from "./CreatePost";
import EditPost from "./EditPost";
import CreateAccount from "./CreateAccount";
import Login from "./Login";
// import NotFound from "./NotFound";

import {
  CssBaseline,
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

function App() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [authenticated, setAuthenticated] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch authentication status from the server
    const apiUrl = `${import.meta.env.VITE_API_BASE_URL}/users/status`;
    fetch(apiUrl, { credentials: "include" }) // Include cookies
      .then((response) => response.json())
      .then((data) => setAuthenticated(data.authenticated))
      .catch((error) => {
        console.error("Error fetching authentication status:", error);
        toast.error(
          "An error occurred while authenticating user. Please try again later."
        );
      });
  }, []);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // Function to handle logout
  const handleLogout = async () => {
    try {
      const apiUrl = `${import.meta.env.VITE_API_BASE_URL}/users/logout`;
      const response = await fetch(apiUrl, {
        method: "POST",
        credentials: "include", // Include cookies in the request
      });

      if (response.ok) {
        setAuthenticated(false);
        navigate("/");
        toast.success("Signed out successfully!");
      } else {
        console.error("Failed to logout");
        toast.error("Failed to logout. Please try again later.");
      }
    } catch (error) {
      console.error("Error logging out:", error);
      toast.error("Error logging out. Please try again later.");
    }
  };

  const EditPostGuard = ({ element }) => {
    const { postId } = useParams();
    const [authorized, setAuthorized] = useState(null);

    useEffect(() => {
      const checkAuthorization = async () => {
        try {
          const userApiUrl = `${
            import.meta.env.VITE_API_BASE_URL
          }/users/status`;
          const userResponse = await fetch(userApiUrl, {
            method: "GET",
            credentials: "include",
          });
          const userData = await userResponse.json();
          const userId = userData.userId;

          const postApiUrl = `${
            import.meta.env.VITE_API_BASE_URL
          }/posts/${postId}`;
          const postResponse = await fetch(postApiUrl, {
            method: "GET",
            credentials: "include",
          });
          const postData = await postResponse.json();
          const postAuthorId = postData.author;

          if (authenticated && userId === postAuthorId) {
            setAuthorized(true);
          } else {
            setAuthorized(false);
            // navigate("/", { replace: true }); // Redirect if not authorized
            // toast.error("Failed to authorize user. Please try again later.");
          }
        } catch (error) {
          console.error("Error checking authorization:", error);
          navigate("/", { replace: true }); // Redirect in case of error
          toast.error(
            "An error occurred while checking authorization. Please try again later."
          );
        }
      };

      checkAuthorization();
    }, [postId]);

    if (authorized === false) {
      navigate("/", { replace: true });
      toast.error("Failed to authorize user. Please try again later.");
      return null;
    }

    return authorized ? element : null;
  };

  return (
    <>
      <CssBaseline />
      <ToastContainer />
      <header>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static">
            <Toolbar>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
                onClick={handleMenuClick}>
                <MenuIcon />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}>
                <MenuItem component={Link} to="/" onClick={handleMenuClose}>
                  Home
                </MenuItem>
                {authenticated ? (
                  <MenuItem
                    component={Link}
                    to="/posts/create-post"
                    onClick={handleMenuClose}>
                    Make New Post
                  </MenuItem>
                ) : null}
                <MenuItem
                  component={Link}
                  to="/users/create-account"
                  onClick={handleMenuClose}>
                  Create Account
                </MenuItem>
              </Menu>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Bones CMS
              </Typography>
              {authenticated !== null &&
                (authenticated ? (
                  <Button color="inherit" onClick={handleLogout}>
                    Logout
                  </Button>
                ) : (
                  <Button color="inherit" component={Link} to="/users/login">
                    Login
                  </Button>
                ))}
            </Toolbar>
          </AppBar>
        </Box>
      </header>
      <main>
        <Routes>
          {/* Define your routes */}
          <Route exact path="/" element={<Home />} />
          <Route
            path="/posts/:postId"
            element={<BlogPost authenticated={authenticated} />}
          />
          {/* Protected route with guard */}
          {authenticated ? (
            <Route path="/posts/create-post" element={<CreatePost />} />
          ) : (
            <Route
              path="/posts/create-post"
              element={<Navigate to="/users/login" replace />}
            />
          )}
          {/* Protected route for editing posts */}
          <Route
            path="/posts/:postId/edit"
            element={<EditPostGuard element={<EditPost />} />}
          />
          <Route
            path="/users/create-account"
            element={<CreateAccount setAuthenticated={setAuthenticated} />}
          />
          <Route
            path="/users/login"
            element={<Login setAuthenticated={setAuthenticated} />}
          />
          {/* Route for handling 404 - Page Not Found */}
          {/* <Route element={<NotFound/>} /> */}
        </Routes>
      </main>
      <footer>{/* Insert footer here */}</footer>
    </>
  );
}

export default App;
