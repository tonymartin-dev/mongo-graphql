import mongoose from "mongoose";

const Schema = mongoose.Schema;

// Create the User Schema.
const UserSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: false
  },
  role: {
    type: String,
    required: true
  }
});

const User = mongoose.model("User", UserSchema, 'user');

export default User;