const Post = require("../models/post");

const isAuthor = async (req, res, next) => {
  try {
    const { id } = req.params;
    const post = await Post.findById(id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (!post.author.equals(req.user._id)) {
      return res
        .status(403)
        .json({ message: "You are not authorized to modify this post" });
    }

    next();
  } catch (err) {
    console.error("Error in isAuthor middleware:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = isAuthor;
