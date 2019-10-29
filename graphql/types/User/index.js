export default `
  type User {
    _id: String
    id: String!
    name: String!
    email: String!
  }
  type Query {
    user(id: String!): User
    userByID(_id: String!): User
    users: [User]
  }
  type Mutation {
    addUser(id: String!, name: String!, email: String!): User
    editUser(_id: String!, id: String, name: String, email: String): User
    deleteUser(_id: String!): User
  }
`;
