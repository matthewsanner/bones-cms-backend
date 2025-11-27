const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  hashtags: [String],
  date: { type: Date, default: Date.now },
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

const Post = mongoose.model("Post", PostSchema);
module.exports = Post;
