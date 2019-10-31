import mongoose from "mongoose";

const Schema = mongoose.Schema;

// Create the Category Schema.
const CategorySchema = new Schema({  
  name: {
    type: String,
    required: true
  }
});

const Category = mongoose.model("Category", CategorySchema, 'category');

export default Category;