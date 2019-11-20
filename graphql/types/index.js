import { mergeTypes } from "merge-graphql-schemas";

import User from "./User";
import Product from "./Product";
import Category from "./Category";

const typeDefs = [User, Product,  Category];

export default mergeTypes(typeDefs, { all: true });