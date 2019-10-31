export default `
  type Category {
    _id: String
    name: String!
  }
  type Query {
    category(_id: String!): Category
    categories( limit: Int, skip: Int ): [Category]
  }
  type Mutation {
    addCategory(name: String!): Category
    editCategory(_id: String!, name: String!): Category
    deleteCategory(_id: String!): Category
  }
`;