import mongoose from "mongoose";

const Schema = mongoose.Schema;

// Create the User Schema.
const UserSchema = new Schema({
  _id: {
    type: String,
    unique: true
  },
  id: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  }
});

const User = mongoose.model("User", UserSchema, 'user');

export default User;