import { mergeTypes } from "merge-graphql-schemas";

//import User from "./User/";
import Product from "./Product";

const typeDefs = [/*User,*/ Product];

export default mergeTypes(typeDefs, { all: true });