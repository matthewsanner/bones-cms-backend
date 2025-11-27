const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  content: {
    type: String,
    required: true,
  },
  date: { type: Date, default: Date.now },
  postId: {
    type: Schema.Types.ObjectId,
    ref: "Post",
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

const Comment = mongoose.model("Comment", CommentSchema);
module.exports = Comment;
