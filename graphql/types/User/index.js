export default `
  type User {
    _id: String!
    username: String!
    email: String
    password: String!
    role: String!
    token: String
  }
  type Query {
    login(username: String!, password: String!): User
    user(username: String!): User
    userByID(_id: String!): User
    users: [User]
  }
  type Mutation {
    addUser(_id: String, username: String!, email: String, password: String!, role: String!): User
    editUser(_id: String!, id: String, name: String, email: String): User
    deleteUser(_id: String!): User
  }
`;
