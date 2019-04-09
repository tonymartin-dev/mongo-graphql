export default `
  type Product {
    name: String!
    description: String!
    price: String!
    category: String!
  }
  type Query {
    product(name: String!): Product
    products: [Product]
    productsByCategory(category: String!): [Product]
  }
  type Mutation {
    addProduct(name: String!, description: String!, price: String!, category: String!): Product
    editProduct(_id: String, name: String, description: String, price: String!, category: String!): Product
    deleteProduct(_id: String, name: String, description: String, price: String!, category: String!): Product
  }
`;