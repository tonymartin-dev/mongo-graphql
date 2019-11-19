export default `
  type Product {
    _id: String
    name: String!
    description: String!
    price: String!
    category: String!
  }
  type Query {
    product(_id: String!): Product
    products( limit: Int, skip: Int ): [Product]
    productsByCategory(category: String!, limit: Int, skip: Int): [Product]
    productsByCategories(categories:[String!]!, limit: Int, skip: Int): [Product]
    productsByName(name: String!): [Product]
    productsCount(name: String): Int
  }
  type Mutation {
    addProduct(name: String!, description: String!, price: String!, category: String!): Product
    editProduct(_id: String, name: String, description: String, price: String, category: String): Product
    deleteProduct(_id: String): Product
  }
`;