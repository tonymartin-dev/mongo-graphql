import mongoose from "mongoose";

const Schema = mongoose.Schema;

// Create the Product Schema.
const ProductSchema = new Schema({
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