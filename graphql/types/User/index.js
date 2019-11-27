export default `
  type User {
    _id: String!
    username: String!
    email: String
    role: String!
    token: String
    password: String
  }
  type Query {
    login(username: String!, password: String!): User
    user(username: String!): User
    userByID(_id: String!): User
    users: [User]
  }
  type Mutation {
    addUser( username: String!, email: String, password: String! ): User
    editUser(_id: String!, username: String, email: String, role: String, password: String): User
    deleteUser(_id: String!): User
  }
`;
