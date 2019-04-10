import mongoose from "mongoose";
var ObjectId = require('mongodb').ObjectID;

const Schema = mongoose.Schema;

// Create the Product Schema.
const ProductSchema = new Schema({
  _id: {
    type: ObjectId,
    unique: true
  },
  name: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  }
});

const Product = mongoose.model("Product", ProductSchema, 'Products');

export default Product;