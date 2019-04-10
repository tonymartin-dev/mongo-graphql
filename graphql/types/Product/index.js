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
    products: [Product]
    productsByCategory(category: String!): [Product]
    productsByName(name: String!): [Product]
  }
  type Mutation {
    addProduct(_id: String, name: String!, description: String!, price: String!, category: String!): Product
    editProduct(_id: String, name: String, description: String, price: String, category: String): Product
    deleteProduct(id: String, name: String, description: String, price: String!, category: String!): Product
  }
`;