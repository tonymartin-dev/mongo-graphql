import { mergeResolvers } from "merge-graphql-schemas";

//import User from "./User/";
import Product from "./Product";
//import Post from "./Post/";
//import Comment from "./Comment/";

const resolvers = [Product/*, User, Post, Comment*/];

export default mergeResolvers(resolvers);