import mongoose from "mongoose";

const Schema = mongoose.Schema;

// Create the Post Schema.
const PostSchema = new Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  comments: {
    type: Array,
    required: false
  }
});

const Post = mongoose.model("Post", PostSchema);

export default Post;