const express = require("express");
const router = express.Router();
const Post = require("../models/post");
const isLoggedIn = require("../utilities/isLoggedIn");
const isAuthor = require("../utilities/isAuthor");

// Route to fetch paginated blog posts
router.get("/", async (req, res) => {
  const page = parseInt(req.query.page) || 1; // Current page number, default to 1
  const limit = parseInt(req.query.limit) || 10; // Number of posts per page, default to 10

  try {
    // Calculate the skip value to skip previous pages
    const skip = (page - 1) * limit;

    // Fetch blog posts using Mongoose
    const totalPosts = await Post.countDocuments();
    const totalPages = Math.ceil(totalPosts / limit);

    const posts = await Post.find()
      .sort({ date: -1 })
      .skip(skip)
      .limit(limit)
      .exec();

    res.status(200).json({ posts, currentPage: page, totalPages });
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

// Fetch a single blog post by ID
router.get("/:id", async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// Create a new blog post
router.post("/", isLoggedIn, async (req, res) => {
  try {
    const { title, content } = req.body;
    // Create a new post object with the title, content, and user information
    const postData = {
      title: title,
      content: content,
      author: req.user._id, // Set the author to the currently signed-in user's ID
    };
    // Save the post to the database
    const newPost = await Post.create(postData);

    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// Update an existing blog post by ID
router.put("/:id", isLoggedIn, isAuthor, async (req, res) => {
  try {
    const postId = req.params.id;
    const { title, content } = req.body;
    const updatedPost = await Post.findByIdAndUpdate(
      postId,
      { title, content },
      { new: true }
    );
    if (!updatedPost) {
      return res.status(404).json({ error: "Post not found" });
    }
    res.json(updatedPost);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// Delete a blog post by ID
router.delete("/:id", async (req, res) => {
  try {
    const postId = req.params.id;
    const deletedPost = await Post.findByIdAndDelete(postId);
    if (!deletedPost) {
      return res.status(404).json({ error: "Post not found" });
    }
    res.json({ message: "Post deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
