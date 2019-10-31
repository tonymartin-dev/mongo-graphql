import { mergeResolvers } from "merge-graphql-schemas";

import User from "./User/";
import Product from "./Product";
import Category from "./Category";

const resolvers = [User, Product, Category];

export default mergeResolvers(resolvers);